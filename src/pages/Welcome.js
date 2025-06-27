import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Card,
  CardContent,
  LinearProgress,
  IconButton,
  Slide,
} from '@mui/material';
import {
  ArrowForward,
  ArrowBack,
  WavingHandOutlined,
  Explore,
  MenuBook,
  Close,
  WarningAmberOutlined,
} from '@mui/icons-material';

const Welcome = ({ onComplete, showWelcome: externalShowWelcome, onResetWelcome }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Welcome steps content
  const steps = [
    {
      title: 'Welcome to 3AMB BHQ',
      content: 'This guide hopes to help you understand your taskings and welfare in 3AMB! From understanding what you\'ll need to do to what you can do (wink)',
      icon: <MenuBook sx={{ fontSize: 60, color: 'primary.main' }} />,
    },
    {
      title: 'Get to Know Your Superiors',
      content: ' It also hopes to provide insights into your superiors\' roles and responsibilities, and who to look for if you need help!',
      icon: <Explore sx={{ fontSize: 60, color: 'success.main' }} />,
    },
    {
      title: 'Refresh on Guidelines of SAF & 3AMB',
      content: 'It refreshes you on what is expected of you as a member of the SAF and 3AMB. This includes understanding the rules, regulations, and culture that govern our organization.',
      icon: <WarningAmberOutlined sx={{ fontSize: 60, color: 'secondary.main' }} />,
    },
    {
      title: 'Get Started',
      content: 'Ready to dive in? Click the button below to begin your journey through the 3AMB ecosystem. You can always return to this guide later.',
      icon: <WavingHandOutlined sx={{ fontSize: 60, color: 'success.main' }} />,
    },
  ];

  // Check if user has visited before or external control
  useEffect(() => {
    // If external control is explicitly set to true, use that
    if (externalShowWelcome === true) {
      setShowWelcome(true);
      setIsVisible(true);
      setActiveStep(0); // Reset to first step when showing externally
      return;
    }
    
    // If external control is explicitly false, don't show
    if (externalShowWelcome === false) {
      setShowWelcome(false);
      setIsVisible(false);
      return;
    }

    // Default behavior when no external control (undefined)
    // Only run automatic behavior if external control is not being used
    if (externalShowWelcome === undefined) {
      // Temporarily always show welcome for testing
      //   setShowWelcome(true);
      //   setIsVisible(true);
      
      // Uncomment below for production behavior:
      const hasVisited = localStorage.getItem('3amb-guidebook-visited');
      if (!hasVisited) {
        setShowWelcome(true);
        setIsVisible(true);
      }
    }
  }, [externalShowWelcome]);

  // Handle scroll events for tab navigation
  useEffect(() => {
    if (!showWelcome) return;

    const handleWheel = (e) => {
      // Always prevent default scrolling behavior
      e.preventDefault();
      e.stopPropagation();
      
      if (isScrolling) return; // Prevent rapid scrolling
      
      setIsScrolling(true);
      
      if (e.deltaY > 0) {
        // Scrolling down - next step
        if (activeStep < steps.length - 1) {
          setActiveStep(prev => prev + 1);
        }
        // Removed: Don't complete the tour when scrolling past last step
      } else {
        // Scrolling up - previous step
        if (activeStep > 0) {
          setActiveStep(prev => prev - 1);
        }
      }
      
      // Reset scrolling flag after a delay
      setTimeout(() => setIsScrolling(false), 500);
    };

    // Block all scrolling on the body when welcome is showing
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Add wheel event listener with capture to block all scrolling
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('scroll', preventScroll, { passive: false, capture: true });
    document.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Cleanup
    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('scroll', preventScroll, { capture: true });
      document.removeEventListener('touchmove', preventScroll, { capture: true });
      document.body.style.overflow = 'unset';
    };
  }, [activeStep, showWelcome, isScrolling, steps.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!showWelcome) return;

    const handleKeyDown = (e) => {
      if (isScrolling) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ': // Spacebar
          e.preventDefault();
          setIsScrolling(true);
          if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
          } else {
            handleComplete();
          }
          setTimeout(() => setIsScrolling(false), 300);
          break;
          
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setIsScrolling(true);
          if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
          }
          setTimeout(() => setIsScrolling(false), 300);
          break;
          
        case 'Escape':
          handleSkip();
          break;
          
        case 'Enter':
          if (activeStep === steps.length - 1) {
            handleComplete();
          } else {
            setIsScrolling(true);
            setActiveStep(prev => prev + 1);
            setTimeout(() => setIsScrolling(false), 300);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStep, showWelcome, isScrolling, steps.length]);

  // Handle next step
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  // Handle previous step
  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // Handle completion
  const handleComplete = () => {
    // Mark as visited in localStorage
    localStorage.setItem('3amb-guidebook-visited', 'true');
    localStorage.setItem('3amb-guidebook-completed-date', new Date().toISOString());
    
    setIsVisible(false);
    setTimeout(() => {
      setShowWelcome(false);
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  // Handle skip
  const handleSkip = () => {
    localStorage.setItem('3amb-guidebook-visited', 'true');
    localStorage.setItem('3amb-guidebook-skipped', 'true');
    setIsVisible(false);
    setTimeout(() => {
      setShowWelcome(false);
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  // Reset welcome (for testing - you can remove this)
  const resetWelcome = () => {
    localStorage.removeItem('3amb-guidebook-visited');
    localStorage.removeItem('3amb-guidebook-completed-date');
    localStorage.removeItem('3amb-guidebook-skipped');
    setShowWelcome(true);
    setIsVisible(true);
    setActiveStep(0);
    if (onResetWelcome) {
      onResetWelcome();
    }
  };

  // Don't render the floating button anymore
  if (!showWelcome) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
        backdropFilter: 'blur(5px)',
      }}
    >
      <Fade in={isVisible} timeout={500}>
        <Container maxWidth="md">
          <Card
            elevation={24}
            sx={{
              maxWidth: 800,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            {/* Header with progress */}
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                p: 2,
                position: 'relative',
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(activeStep / (steps.length - 1)) * 100}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'secondary.main',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography variant="h6" component="h2">
                  Introductions to 3AMB
                </Typography>
                <IconButton
                  onClick={handleSkip}
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <Close />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Step {activeStep + 1} of {steps.length}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                💡 Use scroll wheel or arrow keys to navigate
              </Typography>
            </Box>

            {/* Content */}
            <CardContent sx={{ p: 4, minHeight: 400 }}>
              <Slide
                direction="left"
                in={true}
                key={activeStep}
                timeout={300}
              >
                <Box sx={{ textAlign: 'center' }}>
                  {/* Icon */}
                  <Box sx={{ mb: 3 }}>
                    {steps[activeStep].icon}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: 'text.primary',
                      mb: 3,
                    }}
                  >
                    {steps[activeStep].title}
                  </Typography>

                  {/* Content */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'text.secondary',
                      maxWidth: 500,
                      mx: 'auto',
                      mb: 4,
                    }}
                  >
                    {steps[activeStep].content}
                  </Typography>

                  {/* Step indicator dots */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
                    {steps.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: index === activeStep ? 'primary.main' : 'grey.300',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Slide>
            </CardContent>

            {/* Navigation buttons */}
            <Box
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBack />}
                variant="outlined"
              >
                Back
              </Button>

              <Button
                variant="text"
                onClick={handleSkip}
                sx={{ color: 'text.secondary' }}
              >
                Skip Tour
              </Button>

              <Button
                onClick={handleNext}
                variant="contained"
                endIcon={activeStep === steps.length - 1 ? <WavingHandOutlined /> : <ArrowForward />}
                size="large"
              >
                {activeStep === steps.length - 1 ? 'Get Started' : 'Next'}
              </Button>
            </Box>
          </Card>
        </Container>
      </Fade>
    </Box>
  );
};

export default Welcome;
