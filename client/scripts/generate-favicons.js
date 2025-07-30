/**
 * Favicon Generation Script for Brayden Swavey Portfolio
 * 
 * This script creates various favicon sizes and formats from a source logo
 * Run with: node scripts/generate-favicons.js
 * 
 * Prerequisites:
 * npm install sharp (for image processing)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Favicon sizes needed for comprehensive browser support
const faviconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // iOS
  { size: 192, name: 'android-chrome-192x192.png' }, // Android
  { size: 512, name: 'android-chrome-512x512.png' }, // Android
];

// Load the Photo2edit.jpg image as the logo source
async function loadLogoImage() {
  const logoPath = path.join(__dirname, '../public/Photo2edit.jpg');

  if (!fs.existsSync(logoPath)) {
    throw new Error('Photo2edit.jpg not found in public directory');
  }

  // Process the image to make it square and suitable for favicon
  return await sharp(logoPath)
    .resize(512, 512, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toBuffer();
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

    // Load the Photo2edit.jpg image as the base logo
    const logoBuffer = await loadLogoImage();
    
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
console.log('🚀 Starting favicon generation...');
generateFavicons();

export { generateFavicons };
