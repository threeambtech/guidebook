import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Refresh, Download } from '@mui/icons-material';

const PWAUpdateNotification = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  useEffect(() => {
    // Don't show update notifications in development
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    // Listen for update events from the PWA utilities
    const handleUpdateAvailable = (event) => {
      setUpdateAvailable(true);
      setWaitingWorker(event.detail.waitingWorker);
    };

    const handleUpdateInstalled = () => {
      setUpdateAvailable(false);
      setUpdating(false);
      setWaitingWorker(null);
    };

    window.addEventListener('pwa-update-available', handleUpdateAvailable);
    window.addEventListener('pwa-update-installed', handleUpdateInstalled);

    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
      window.removeEventListener('pwa-update-installed', handleUpdateInstalled);
    };
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      setUpdating(true);
      // Tell the waiting service worker to skip waiting and become active
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      
      // Listen for the controlling service worker to change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload the page to get the new version
        window.location.reload();
      });
    }
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <Snackbar
      open={updateAvailable}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ mb: 2 }}
    >
      <Alert
        severity="info"
        sx={{
          width: '100%',
          '& .MuiAlert-action': {
            alignItems: 'center',
            pt: 0,
          },
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {updating ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} color="inherit" />
                <Typography variant="body2">Updating...</Typography>
              </Box>
            ) : (
              <>
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleDismiss}
                >
                  Later
                </Button>
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleUpdate}
                  startIcon={<Refresh />}
                  variant="outlined"
                  sx={{ 
                    borderColor: 'currentColor',
                    '&:hover': {
                      borderColor: 'currentColor',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Update Now
                </Button>
              </>
            )}
          </Box>
        }
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            <Download sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
            New version available!
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
            A new version of 3AMB Guidebook is ready to install with the latest features and improvements.
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default PWAUpdateNotification;
