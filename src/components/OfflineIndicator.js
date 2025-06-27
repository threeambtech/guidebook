import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import { WifiOff, Wifi } from '@mui/icons-material';
import { getNetworkStatus, setupNetworkListener } from '../utils/pwa';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(getNetworkStatus().online);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleNetworkChange = (online) => {
      const wasOffline = !isOnline;
      setIsOnline(online);
      
      if (!online) {
        setShowOfflineMessage(true);
        setShowOnlineMessage(false);
      } else if (wasOffline && online) {
        setShowOfflineMessage(false);
        setShowOnlineMessage(true);
      }
    };

    setupNetworkListener(handleNetworkChange);
    
    // Initial check
    if (!isOnline) {
      setShowOfflineMessage(true);
    }
  }, [isOnline]);

  const handleCloseOffline = () => {
    setShowOfflineMessage(false);
  };

  const handleCloseOnline = () => {
    setShowOnlineMessage(false);
  };

  return (
    <>
      {/* Persistent offline indicator */}
      {!isOnline && (
        <Box
          sx={{
            position: 'fixed',
            top: 64, // Below AppBar
            left: 0,
            right: 0,
            bgcolor: 'warning.main',
            color: 'warning.contrastText',
            py: 1,
            px: 2,
            zIndex: 1201,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WifiOff sx={{ mr: 1, fontSize: 'small' }} />
          <Typography variant="body2">
            You're offline. Some features may be limited.
          </Typography>
        </Box>
      )}

      {/* Offline notification */}
      <Snackbar
        open={showOfflineMessage}
        onClose={handleCloseOffline}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={4000}
      >
        <Alert 
          onClose={handleCloseOffline} 
          severity="warning" 
          sx={{ width: '100%' }}
          icon={<WifiOff />}
        >
          You're now offline. The app will continue to work with cached content.
        </Alert>
      </Snackbar>

      {/* Back online notification */}
      <Snackbar
        open={showOnlineMessage}
        onClose={handleCloseOnline}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      >
        <Alert 
          onClose={handleCloseOnline} 
          severity="success" 
          sx={{ width: '100%' }}
          icon={<Wifi />}
        >
          You're back online!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineIndicator;
