import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker, setupInstallPrompt } from './utils/pwa';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register PWA features only in production
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
  setupInstallPrompt();
} else {
  console.log('PWA features disabled in development mode');
}

