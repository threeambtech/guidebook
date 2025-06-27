# PWA Testing Guide

## Development vs Production PWA Behavior

### 🚫 Development Mode (Default)
- **PWA features DISABLED** to avoid conflicts with hot reloading
- No service worker registration
- No install prompts
- No update notifications
- No offline caching

### ✅ Production Mode
- **PWA features ENABLED** automatically
- Full service worker functionality
- Install prompts available
- Update notifications work
- Offline caching active

## How to Test PWA Features

### Method 1: Production Build (Recommended)
```bash
# Build for production
npm run build

# Serve the production build locally (install serve if needed)
npm install -g serve
serve -s build -l 3000

# Or use Python
python -m http.server 3000 -d build

# Or use Node.js
npx serve -s build -l 3000
```

### Method 2: Enable PWA in Development (For Testing Only)
1. Open `.env.development`
2. Uncomment: `REACT_APP_ENABLE_PWA_DEV=true`
3. Restart development server: `npm start`
4. **Remember to comment it back out when done testing!**

### Method 3: Use Chrome DevTools PWA Simulation
1. Open Chrome DevTools (F12)
2. Go to "Application" tab
3. Click "Service Workers" in sidebar
4. Use "Update on reload" for testing updates
5. Use "Application" > "Manifest" to test install prompts

## Testing Checklist

### ✅ PWA Installation
- [ ] Visit app in Chrome/Edge
- [ ] Look for install icon in address bar
- [ ] Click install button in app header
- [ ] Verify app installs to desktop/home screen
- [ ] Launch installed app (should open in standalone mode)

### ✅ Offline Functionality
- [ ] Load app while online
- [ ] Disconnect internet/turn on airplane mode
- [ ] Refresh page - should still work
- [ ] Check offline indicator appears

### ✅ Update Mechanism
- [ ] Make code changes
- [ ] Build and deploy new version
- [ ] Wait 1 minute (or manually refresh)
- [ ] Update notification should appear
- [ ] Click "Update Now"
- [ ] App should reload with new content

### ✅ Service Worker
- [ ] Check DevTools > Application > Service Workers
- [ ] Verify service worker is registered
- [ ] Check cache storage for cached files

## Browser Testing

### Best PWA Support:
- ✅ Chrome (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)
- ✅ Safari (Mobile - limited features)
- ⚠️ Firefox (Desktop - limited install)

### PWA Features by Browser:
| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| Install Prompt | ✅ | ✅ | ✅ (iOS) | ❌ |
| Offline Caching | ✅ | ✅ | ✅ | ✅ |
| Update Notifications | ✅ | ✅ | ✅ | ✅ |
| Standalone Mode | ✅ | ✅ | ✅ | ❌ |

## Common Testing Issues

### Issue: "Install button not showing"
**Solutions:**
- Must be HTTPS (or localhost)
- Must have valid manifest.json
- Must have registered service worker
- Browser must support PWA install

### Issue: "Updates not working"
**Solutions:**
- Check if in development mode (PWA disabled)
- Verify service worker is registered
- Try hard refresh (Ctrl+Shift+R)
- Check DevTools > Application > Service Workers

### Issue: "App not working offline"
**Solutions:**
- Verify service worker is caching files
- Check cache in DevTools > Application > Storage
- Ensure you've visited pages while online first

## Production Deployment Testing

### After Deploying to Hosting Service:
1. **Clear browser cache completely**
2. **Visit your live URL**
3. **Test all PWA features**
4. **Verify HTTPS is working**
5. **Test on mobile devices**

### Quick Mobile Test:
1. Open app in mobile browser
2. Look for "Add to Home Screen" option
3. Install app to home screen
4. Open installed app
5. Test offline functionality

## Debugging Commands

```bash
# Check if files are being cached
# Open DevTools Console and run:
navigator.serviceWorker.getRegistrations().then(console.log)

# Force service worker update
navigator.serviceWorker.getRegistrations().then(reg => reg[0].update())

# Clear all PWA data (for testing fresh installs)
# DevTools > Application > Storage > Clear storage
```

## Development Best Practices

1. **Always develop with PWA disabled** (default behavior)
2. **Test PWA features only in production builds**
3. **Use Chrome DevTools for PWA debugging**
4. **Test on real mobile devices before launching**
5. **Clear cache between tests for accurate results**

Remember: PWA features require HTTPS in production (localhost is exempt for testing).
