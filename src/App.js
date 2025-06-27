import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Container,
  IconButton, Drawer, List, ListItem, ListItemText,
  Box,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import ScrollTopButton from '../src/components/scrollTopButton';
import Welcome from './pages/Welcome';
import Settings from './pages/Settings';
import Help from './pages/Help';
import About from './pages/About';
import CustomAppBar from './components/CustomAppBar';



function App() {
  const [showWelcomeOverride, setShowWelcomeOverride] = useState(undefined); // Use undefined initially
  const [hasManuallyTriggered, setHasManuallyTriggered] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [themeMode, setThemeMode] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  // Load theme and font size from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('3amb-lightdark') || 'light';
    const savedFontSize = parseInt(localStorage.getItem('3amb-font-size')) || 16;
    const savedHighContrast = localStorage.getItem('3amb-high-contrast') === 'true';
    
    setThemeMode(savedTheme);
    setFontSize(savedFontSize);
    setHighContrast(savedHighContrast);

    // Load saved page with activity check
    loadSavedPage();
  }, []);

  // Page memory functionality
  const loadSavedPage = () => {
    const savedPageData = localStorage.getItem('3amb-current-page');
    if (savedPageData) {
      try {
        const { page, timestamp } = JSON.parse(savedPageData);
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

        // Check if less than 30 minutes have passed
        if (now - timestamp < thirtyMinutes) {
          setCurrentPage(page);
        } else {
          // Clear expired page data
          localStorage.removeItem('3amb-current-page');
          setCurrentPage('home');
        }
      } catch (error) {
        // If there's an error parsing, just go to home
        localStorage.removeItem('3amb-current-page');
        setCurrentPage('home');
      }
    }
  };

  const saveCurrentPage = (page) => {
    const pageData = {
      page: page,
      timestamp: Date.now()
    };
    localStorage.setItem('3amb-current-page', JSON.stringify(pageData));
  };

  // Track user activity to update timestamp
  useEffect(() => {
    const updateActivity = () => {
      const savedPageData = localStorage.getItem('3amb-current-page');
      if (savedPageData) {
        try {
          const { page } = JSON.parse(savedPageData);
          saveCurrentPage(page); // Update timestamp
        } catch (error) {
          // If error, remove the data
          localStorage.removeItem('3amb-current-page');
        }
      }
    };

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Cleanup event listeners
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, []);

  // Create dynamic theme
  const theme = createAppTheme(themeMode, fontSize, highContrast);

  const handleShowWelcome = () => {
    setHasManuallyTriggered(true);
    setShowWelcomeOverride(true);
  };

  const handleWelcomeComplete = () => {
    if (hasManuallyTriggered) {
      // If manually triggered, just hide it
      setShowWelcomeOverride(false);
    } else {
      // If automatic, reset to undefined to allow normal behavior
      setShowWelcomeOverride(undefined);
    }
    console.log('Welcome tour completed!');
  };

  const handleThemeChange = (newLightDark) => {
    setThemeMode(newLightDark);
  };

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const handleHighContrastChange = (newHighContrast) => {
    setHighContrast(newHighContrast);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    saveCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'settings':
        return (
          <Settings
            onThemeChange={handleThemeChange}
            onFontSizeChange={handleFontSizeChange}
            onHighContrastChange={handleHighContrastChange}
            currentTheme={themeMode}
            currentFontSize={fontSize}
            currentHighContrast={highContrast}
          />
        );
      case 'help':
        return <Help />;
      case 'about':
        return <About />;
      case 'home':
      default:
        return (
          <Box sx={{ height: '3000px', bgcolor: 'background.paper' }}>
            <Container maxWidth="md" sx={{ pt: 4 }}>
              <Typography variant="h3" gutterBottom>
                Welcome to 3AMB Guidebook
              </Typography>
              <Typography variant="body1" paragraph>
                This guidebook is designed to help you navigate through the 3AMB ecosystem.
                Use the menu to access different sections and customize your experience in Settings.
              </Typography>
              <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Quick Links
              </Typography>
              <Typography variant="body1">
                • Use the hamburger menu to navigate dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark dark
              </Typography>
              <Typography variant="body1">
                • Access Settings to customize theme and font size
              </Typography>
              <Typography variant="body1">
                • Check Help for website update procedures
              </Typography>
              <Typography variant="body1">
                • Restart the Welcome Tour anytime from the menu
              </Typography>
            </Container>
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Welcome 
        showWelcome={showWelcomeOverride}
        onComplete={handleWelcomeComplete}
      />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <CustomAppBar 
          onShowWelcome={handleShowWelcome}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        {renderCurrentPage()}
        <ScrollTopButton />
      </Box>
    </ThemeProvider>
  )
}

export default App;
