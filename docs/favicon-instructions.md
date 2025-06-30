# Favicon Setup Instructions

## Quick Setup (Manual)

Since you have `brayden-profile.jpg` in your public folder, you can quickly create favicons:

### Option 1: Use Online Favicon Generator
1. Go to https://favicon.io/favicon-converter/
2. Upload your `brayden-profile.jpg` file
3. Download the generated favicon package
4. Extract and place these files in your `public/` folder:
   - favicon.ico
   - favicon-16x16.png
   - favicon-32x32.png
   - apple-touch-icon.png
   - android-chrome-192x192.png
   - android-chrome-512x512.png

### Option 2: Use the "BS" Text Logo
1. Go to https://favicon.io/favicon-generator/
2. Enter "BS" as text
3. Choose a blue background (#3b82f6)
4. Choose white text
5. Select a serif font
6. Download and extract to `public/` folder

### Option 3: Automated Script (Recommended)
```bash
# Install sharp for image processing
npm install --save-dev sharp

# Run the favicon generation script
node scripts/generate-favicons.js
```

## Files Needed in public/:
- favicon.ico (main favicon)
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png (180x180)
- android-chrome-192x192.png
- android-chrome-512x512.png
- site.webmanifest (already created)
- browserconfig.xml (already created)

## Verification
After adding favicons, check:
1. Browser tab shows your favicon
2. Bookmark shows your favicon
3. Mobile home screen icon works
4. No console errors about missing favicon files
