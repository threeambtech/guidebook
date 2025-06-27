#!/usr/bin/env node

/**
 * Version Update Script for 3AMB Guidebook
 * 
 * Usage: node update-version.js [new-version]
 * Example: node update-version.js 1.2.0
 */

const fs = require('fs');
const path = require('path');

// Get version from command line argument
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('Please provide a version number: node update-version.js 1.2.0');
  process.exit(1);
}

// Validate version format (basic check)
if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
  console.error('Version must be in format x.y.z (e.g., 1.2.0)');
  process.exit(1);
}

console.log(`🔄 Updating version to ${newVersion}...`);

// 1. Update package.json
const packagePath = path.join(__dirname, 'package.json');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageData.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2) + '\n');
console.log('✅ Updated package.json');

// 2. Update About.js
const aboutPath = path.join(__dirname, 'src', 'pages', 'About.js');
let aboutContent = fs.readFileSync(aboutPath, 'utf8');
aboutContent = aboutContent.replace(
  /const version = '[^']+';/,
  `const version = '${newVersion}';`
);

// Update last updated date
const currentDate = new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long' 
});
aboutContent = aboutContent.replace(
  /const lastUpdated = '[^']+';/,
  `const lastUpdated = '${currentDate}';`
);

fs.writeFileSync(aboutPath, aboutContent);
console.log('✅ Updated About.js');

// 3. Update service worker cache name
const swPath = path.join(__dirname, 'public', 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');
swContent = swContent.replace(
  /const CACHE_NAME = '[^']+';/,
  `const CACHE_NAME = '3amb-guidebook-v${newVersion}';`
);
fs.writeFileSync(swPath, swContent);
console.log('✅ Updated service worker cache');

console.log(`🎉 Successfully updated version to ${newVersion}!`);
console.log('\n📋 Next steps:');
console.log('1. npm run build (to create production build)');
console.log('2. Test the app with the new version');
console.log('3. Deploy to your hosting service');
console.log('4. Users will automatically get update notifications');
