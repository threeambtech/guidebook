import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Slider,
  Button,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  FormatSize,
  Palette,
  RestartAlt,
  Contrast,
} from '@mui/icons-material';

const Settings = ({ onThemeChange, onFontSizeChange, onHighContrastChange, currentTheme = 'light', currentFontSize = 16, currentHighContrast = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(currentTheme === 'dark');
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [isHighContrast, setIsHighContrast] = useState(currentHighContrast);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('3amb-lightdark') || 'light';
    const savedFontSize = parseInt(localStorage.getItem('3amb-font-size')) || 16;
    const savedHighContrast = localStorage.getItem('3amb-high-contrast') === 'true';
    
    setIsDarkMode(savedTheme === 'dark');
    setFontSize(savedFontSize);
    setIsHighContrast(savedHighContrast);
  }, []);

  // Handle light and dark toggle
  const handleThemeChange = (event) => {
    const newLightDark = event.target.checked ? 'dark' : 'light';
    setIsDarkMode(event.target.checked);
    
    // Save to localStorage
    localStorage.setItem('3amb-lightdark', newLightDark);
    
    // Notify parent component
    if (onThemeChange) {
      onThemeChange(newLightDark);
    }
  };

  // Handle high contrast toggle
  const handleHighContrastChange = (event) => {
    const newHighContrast = event.target.checked;
    setIsHighContrast(newHighContrast);
    
    // Save to localStorage
    localStorage.setItem('3amb-high-contrast', newHighContrast.toString());
    
    // Notify parent component
    if (onHighContrastChange) {
      onHighContrastChange(newHighContrast);
    }
  };

  // Handle font size change
  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
    
    // Save to localStorage
    localStorage.setItem('3amb-font-size', newValue.toString());
    
    // Notify parent component
    if (onFontSizeChange) {
      onFontSizeChange(newValue);
    }
  };

  // Handle font size commit (when user stops dragging)
  const handleFontSizeCommit = (event, newValue) => {
    // No action needed - changes are saved immediately
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    setIsDarkMode(false);
    setFontSize(16);
    setIsHighContrast(false);
    
    localStorage.setItem('3amb-lightdark', 'light');
    localStorage.setItem('3amb-font-size', '16');
    localStorage.setItem('3amb-high-contrast', 'false');
    
    if (onThemeChange) onThemeChange('light');
    if (onFontSizeChange) onFontSizeChange(16);
    if (onHighContrastChange) onHighContrastChange(false);
  };

  // Font size marks for the slider
  const fontSizeMarks = [
    { value: 12, label: 'Small' },
    { value: 16, label: 'Medium' },
    { value: 20, label: 'Large' },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Customize your 3AMB Guidebook experience
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Appearance Settings */}
        <Card elevation={2} id="appearance">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Palette sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                Appearance
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isDarkMode}
                    onChange={handleThemeChange}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isDarkMode ? (
                      <Brightness4 sx={{ mr: 1 }} />
                    ) : (
                      <Brightness7 sx={{ mr: 1 }} />
                    )}
                    <Typography>
                      {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </Typography>
                  </Box>
                }
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Toggle between light and dark theme
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isHighContrast}
                    onChange={handleHighContrastChange}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Contrast sx={{ mr: 1 }} />
                    <Typography>
                      High Contrast Mode
                    </Typography>
                  </Box>
                }
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Enable high contrast colors for better accessibility
              </Typography>
            </Box>

            {/* Theme Preview */}
            <Paper 
              sx={{ 
                p: 2, 
                bgcolor: isHighContrast 
                  ? (isDarkMode ? '#000000' : '#ffffff')
                  : (isDarkMode ? 'grey.900' : 'grey.50'),
                border: isHighContrast ? 2 : 1,
                borderColor: isHighContrast 
                  ? (isDarkMode ? '#ffffff' : '#000000')
                  : 'divider'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isHighContrast 
                    ? (isDarkMode ? '#ffffff' : '#000000')
                    : (isDarkMode ? 'grey.100' : 'grey.900'),
                  mb: 1,
                  fontWeight: isHighContrast ? 'bold' : 'normal'
                }}
              >
                Preview:
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: isHighContrast 
                    ? (isDarkMode ? '#ffffff' : '#000000')
                    : (isDarkMode ? 'white' : 'black'),
                  fontSize: `${fontSize}px`,
                  fontWeight: isHighContrast ? 'bold' : 'normal'
                }}
              >
                3AMB Guidebook Sample Text
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isHighContrast 
                    ? (isDarkMode ? '#ffffff' : '#000000')
                    : (isDarkMode ? 'grey.300' : 'grey.600'),
                  fontSize: `${fontSize - 2}px`,
                  fontWeight: isHighContrast ? 'bold' : 'normal'
                }}
              >
                This is how your content will appear with current settings.
              </Typography>
            </Paper>
          </CardContent>
        </Card>

        {/* Typography Settings */}
        <Card elevation={2} id="typography">
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <FormatSize sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                Typography
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>
                Font Size: {fontSize}px
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  onChangeCommitted={handleFontSizeCommit}
                  min={12}
                  max={20}
                  step={1}
                  marks={fontSizeMarks}
                  valueLabelDisplay="auto"
                  sx={{ mt: 2, mb: 2 }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
              <Chip 
                label={`Current: ${fontSize}px`} 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={fontSize <= 14 ? 'Small' : fontSize <= 18 ? 'Medium' : 'Large'} 
                color="secondary"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card elevation={2} id="quick-actions">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                startIcon={<RestartAlt />}
                onClick={handleResetToDefaults}
                color="warning"
              >
                Reset to Defaults
              </Button>
            </Stack>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Reset all settings to their default values (Light mode, 16px font, High contrast off)
            </Typography>
          </CardContent>
        </Card>

        {/* Settings Info */}
        <Card elevation={1} sx={{ bgcolor: 'info.main', color: 'info.contrastText' }}>
          <CardContent>
            <Typography variant="body2">
              💡 <strong>Tip:</strong> Your preferences are automatically saved and will be remembered 
              when you visit the guidebook again.
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Settings;
