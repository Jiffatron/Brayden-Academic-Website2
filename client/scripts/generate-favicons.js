/**
 * Favicon Generation Script for Brayden Swavey Portfolio
 * 
 * This script creates various favicon sizes and formats from a source logo
 * Run with: node scripts/generate-favicons.js
 * 
 * Prerequisites:
 * npm install sharp (for image processing)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Favicon sizes needed for comprehensive browser support
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // iOS
  { size: 192, name: 'android-chrome-192x192.png' }, // Android
  { size: 512, name: 'android-chrome-512x512.png' }, // Android
];

// Create a simple "BS" logo programmatically
async function createBSLogo() {
  const logoSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="80" fill="url(#grad)"/>
      <text x="256" y="320" font-family="serif" font-size="240" font-weight="bold" 
            text-anchor="middle" fill="white">BS</text>
    </svg>
  `;
  
  return Buffer.from(logoSvg);
}

// Generate all favicon sizes
async function generateFavicons() {
  try {
    console.log('🎨 Generating favicons...');
    
    // Create public directory if it doesn't exist
    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Create the base logo
    const logoBuffer = await createBSLogo();
    
    // Generate each favicon size
    for (const { size, name } of faviconSizes) {
      await sharp(logoBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate ICO file (multiple sizes in one file)
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ Generated favicon.ico');

    // Create web app manifest
    const manifest = {
      name: "Brayden Swavey Portfolio",
      short_name: "BS Portfolio",
      description: "Financial analyst and developer portfolio showcasing projects in Monte Carlo simulation, bond tracking, and equity research.",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3b82f6",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    fs.writeFileSync(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('✅ Generated site.webmanifest');
    console.log('🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

// Run the script
if (require.main === module) {
  generateFavicons();
}

module.exports = { generateFavicons };
