import { useState, useEffect } from 'react';
import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { GetApp as InstallIcon } from '@mui/icons-material';
import { installPWA, isPWA } from '../utils/pwa';

const PWAInstallButton = () => {
  const [canInstall, setCanInstall] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Don't show install button in development
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Check if already running as PWA
    if (isPWA()) {
      setCanInstall(false);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setCanInstall(true);
      window.deferredPrompt = e;
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      setCanInstall(false);
      setShowSuccess(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    const result = await installPWA();
    if (result) {
      setCanInstall(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  if (!canInstall) {
    return null;
  }

  return (
    <>
      <Tooltip title="Install App">
        <IconButton
          color="inherit"
          onClick={handleInstall}
          sx={{ mr: 1 }}
        >
          <InstallIcon />
        </IconButton>
      </Tooltip>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          3AMB Guidebook installed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PWAInstallButton;
