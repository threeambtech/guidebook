
import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  ListItemButton,
  TextField,
  InputAdornment,
  Paper,
  Popper,
  ClickAwayListener,
  Fade,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Info,
  Settings,
  Help,
  WavingHand,
  Upgrade,
  Search as SearchIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

function CustomAppBar({ onShowWelcome, onPageChange, currentPage }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchContainerRef = useRef(null);

  // Search index with scroll targets
  const searchIndex = [
    // Home page 
    { 
      page: 'home', 
      title: 'Welcome to 3AMB Guidebook', 
      content: 'guidebook navigate 3AMB ecosystem menu sections customize experience settings',
      icon: <Home />,
      scrollTarget: 'top'
    },
    
    // About page 
    { 
      page: 'about', 
      title: 'About 3AMB Guidebook', 
      content: 'comprehensive digital companion 3AMB ecosystem usability accessibility efficiency mission',
      icon: <Info />,
      scrollTarget: 'top'
    },
    { 
      page: 'about', 
      title: 'Our Mission', 
      content: 'centralized user-friendly resource complex information accessible searchable actionable beautiful tailored needs',
      icon: <Info />,
      scrollTarget: 'mission'
    },
    { 
      page: 'about', 
      title: 'Key Features', 
      content: 'comprehensive guidebook customizable themes accessibility fast responsive modern technology reliable secure',
      icon: <Info />,
      scrollTarget: 'features'
    },
    { 
      page: 'about', 
      title: 'Technology Stack', 
      content: 'react material-ui javascript css html local storage api modern web technologies',
      icon: <Info />,
      scrollTarget: 'tech-stack'
    },
    { 
      page: 'about', 
      title: 'Getting Started Guide', 
      content: 'navigate customize explore hamburger menu settings procedures',
      icon: <Info />,
      scrollTarget: 'getting-started'
    },
    
    // Settings page 
    { 
      page: 'settings', 
      title: 'Settings - Appearance', 
      content: 'light mode dark mode high contrast theme appearance customize',
      icon: <Settings />,
      scrollTarget: 'appearance'
    },
    { 
      page: 'settings', 
      title: 'Settings - Typography', 
      content: 'font size small medium large typography text size adjustment',
      icon: <Settings />,
      scrollTarget: 'typography'
    },
    { 
      page: 'settings', 
      title: 'Settings - Reset', 
      content: 'reset defaults restore original settings',
      icon: <Settings />,
      scrollTarget: 'quick-actions'
    },
    
    // Help page 
    { 
      page: 'help', 
      title: 'Website Updates', 
      content: 'making updates website technical expertise contact development team github repository',
      icon: <Help />,
      scrollTarget: 'updates'
    },
    { 
      page: 'help', 
      title: 'Key Contacts', 
      content: 'web development team threeambtech@gmail.com phone contact website management',
      icon: <Help />,
      scrollTarget: 'contacts'
    },
    { 
      page: 'help', 
      title: 'Technical Resources', 
      content: 'github repository source code version control documentation wiki technical setup guides',
      icon: <Help />,
      scrollTarget: 'technical'
    },
    { 
      page: 'help', 
      title: 'Update Procedures', 
      content: 'content updates users developers procedures different types updates',
      icon: <Help />,
      scrollTarget: 'procedures'
    },
    
    // Navigation items
    { 
      page: 'home', 
      title: 'Navigate to Home', 
      content: 'home main page welcome guidebook',
      icon: <Home />,
      scrollTarget: 'top'
    },
    { 
      page: 'about', 
      title: 'Navigate to About', 
      content: 'about information features technology mission',
      icon: <Info />,
      scrollTarget: 'top'
    },
    { 
      page: 'settings', 
      title: 'Navigate to Settings', 
      content: 'settings preferences customize theme font size',
      icon: <Settings />,
      scrollTarget: 'top'
    },
    { 
      page: 'help', 
      title: 'Navigate to Help', 
      content: 'help update page contacts procedures resources',
      icon: <Help />,
      scrollTarget: 'top'
    },
  ];

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const results = searchIndex.filter(item => {
      const searchText = `${item.title} ${item.content}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    }).slice(0, 8); // Limit to 8 results

    setSearchResults(results);
  };

  // Update search results when query changes
  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  // Search button toggle handler
  const handleSearchToggle = (event) => {
    if (!searchOpen) {
      setSearchOpen(true);
      // Set the search container as anchor for consistent positioning
      setAnchorEl(searchContainerRef.current);
    } else {
      handleSearchClose();
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setAnchorEl(null);
  };

  const handleSearchResultClick = (result) => {
    handleSearchClose();
    setDrawerOpen(false);
    if (onPageChange) {
      onPageChange(result.page);
      
      // Scroll to specific section after a short delay to allow page to load
      if (result.scrollTarget && result.scrollTarget !== 'top') {
        setTimeout(() => {
          const element = document.getElementById(result.scrollTarget);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }
        }, 100);
      } else {
        // Scroll to top if no specific target
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleShowWelcome = () => {
    setDrawerOpen(false);
    if (onShowWelcome) {
      onShowWelcome();
    }
  };

  const handlePageNavigation = (page) => {
    setDrawerOpen(false);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const menuItems = [
    { 
      text: 'Home', 
      icon: <Home />, 
      action: () => handlePageNavigation('home'),
      page: 'home'
    },
    { 
      text: 'About', 
      icon: <Info />, 
      action: () => handlePageNavigation('about'),
      page: 'about'
    },
    { 
      text: 'Settings', 
      icon: <Settings />, 
      action: () => handlePageNavigation('settings'),
      page: 'settings'
    },
    { 
      text: 'Help', 
      icon: <Help />, 
      action: () => handlePageNavigation('help'),
      page: 'help'
    },
  ];

  return (
    <>
      <AppBar position="static" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* Title */}
          {!searchOpen && (
            <Typography 
              variant="h6" 
              component="div"
              sx={{ 
                flexGrow: 1,
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              3AMB Guidebook
            </Typography>
          )}
          
          {/* Search functionality */}
          <Box 
            sx={{ 
              position: 'relative',
              flexGrow: searchOpen ? 1 : 0,
              display: 'flex',
              justifyContent: searchOpen ? 'center' : 'flex-end'
            }}
            ref={searchContainerRef}
          >
            {!searchOpen ? (
              <IconButton
                color="inherit"
                onClick={handleSearchToggle}
                sx={{ mr: 1 }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            ) : (
              <ClickAwayListener onClickAway={handleSearchClose}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: 600,
                  justifyContent: 'center'
                }}>
                  <TextField
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guidebook..."
                    variant="outlined"
                    size="small"
                    sx={{
                      width: '100%',
                      mr: 1,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.7)',
                        },
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }
                    }}
                  />
                  <IconButton
                    color="inherit"
                    onClick={handleSearchClose}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </ClickAwayListener>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Search Results Popper - Anchored to centered search container */}
      <Popper
        open={searchOpen && searchResults.length > 0}
        anchorEl={anchorEl}
        placement="bottom"
        transition
        sx={{ 
          zIndex: 1300,
          width: 350,
        }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
              padding: 16,
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={200}>
            <Paper
              elevation={8}
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                border: 1,
                borderColor: 'divider'
              }}
            >
              <Box sx={{ p: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
                  Search Results ({searchResults.length})
                </Typography>
                <List dense>
                  {searchResults.map((result, index) => (
                    <ListItemButton
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                          {result.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={result.title}
                        secondary={`Page: ${result.page.charAt(0).toUpperCase() + result.page.slice(1)}`}
                        slotProps={{
                          primary: {
                            variant: 'body2',
                            sx: { fontWeight: 'medium' }
                          },
                          secondary: {
                            variant: 'caption'
                          }
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            3AMB Menu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Navigate through the guidebook
          </Typography>
        </Box>
        
        <Divider />
        
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => {
                item.action();
              }}
              selected={currentPage === item.page}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        {/* Welcome Tour Section */}
        <List>
          <ListItemButton onClick={handleShowWelcome}>
            <ListItemIcon>
              <WavingHand sx={{ color: 'secondary.main' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Show Welcome Tour"
              secondary="Restart the introduction"
            />
          </ListItemButton>
        </List>

        <Box sx={{ flexGrow: 1 }} />
        
        {/* Footer in drawer */}
        <Box sx={{ p: 2, bgcolor: 'grey.50', mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            3AMB Guidebook v1.0
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default CustomAppBar;