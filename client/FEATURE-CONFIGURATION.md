# 🎛️ Feature Configuration Guide

## 📋 Overview

Your portfolio includes a centralized feature configuration system that allows you to easily enable or disable various features without modifying multiple files.

## 🔧 Configuration File

### **Location**: `client/src/config/features.ts`

### **Current Features:**
```typescript
export const FEATURES: FeatureConfig = {
  // Homepage Table of Contents
  homepageTableOfContents: true, // ← Change to false to disable
  homepageTocStartsMinimized: true, // ← Change to false to start expanded

  // Analytics
  firebaseAnalytics: false, // ← Change to true when Firebase configured

  // Development tools (auto-disabled in production)
  adminPortal: import.meta.env.DEV,
  seoTester: import.meta.env.DEV,

  // UI features
  darkModeToggle: true,
  stockTicker: true,
  blogComments: true,
};
```

## 📍 Homepage Table of Contents

### **Current Configuration:**
- **Enabled**: `true` (visible on homepage)
- **Starts Minimized**: `true` (appears as small icon, click to expand)
- **Positioning**: Left side (`left-6`)
- **Responsive**: Only visible on lg+ screens (1024px+)
- **Toggle**: Can be disabled by setting `homepageTableOfContents: false`

### **Features:**
- **Smart Section Tracking**: Automatically highlights current section
- **Smooth Scrolling**: Click to navigate to any section
- **Progress Indicator**: Shows reading progress percentage
- **Quick Actions**: "Top" and "Contact" buttons
- **Professional Animations**: Framer Motion transitions

### **Positioning Details:**
- **Alignment**: Middle of left margin space
- **Calculation**: `calc(50vw - 960px + 2rem)` from left edge
- **Responsive**: Hidden on mobile, tablet, and desktop (< 1536px)
- **Z-index**: 30 (above content, below modals)

## 🎛️ How to Disable/Enable Features

### **Method 1: Edit Configuration File**
```typescript
// In client/src/config/features.ts
export const FEATURES: FeatureConfig = {
  homepageTableOfContents: false, // ← Disable TOC
  firebaseAnalytics: true,        // ← Enable Firebase
  // ... other features
};
```

### **Method 2: Development Console (Dev Mode Only)**
```javascript
// In browser console during development
features.disableTOC();  // Disable table of contents
features.enableTOC();   // Enable table of contents
features.config;        // View current configuration
```

### **Method 3: Environment-Based**
```typescript
// Features can be environment-dependent
homepageTableOfContents: !import.meta.env.PROD, // Only in development
firebaseAnalytics: import.meta.env.PROD,        // Only in production
```

## 📱 Responsive Behavior

### **Table of Contents Visibility:**
- **Mobile (< 768px)**: Hidden
- **Tablet (768px - 1024px)**: Hidden
- **Desktop (1024px - 1536px)**: Hidden
- **Large Desktop (1536px+)**: Visible

### **Why 2xl+ Only:**
- **Space Requirements**: TOC needs adequate left margin space
- **Content Priority**: Smaller screens prioritize main content
- **Performance**: Reduces DOM complexity on mobile devices
- **UX**: Avoids clutter on smaller viewports

## 🔧 Development Tools

### **Admin Portal:**
- **Enabled**: Only in development mode
- **Location**: Bottom-left "🚀 Admin Portal" button
- **Features**: View counts, analytics, comments, performance tools
- **Production**: Automatically hidden

### **SEO Tester:**
- **Enabled**: Only in development mode
- **Location**: Bottom-right "SEO Debug" button
- **Features**: Metadata validation, social preview testing
- **Production**: Automatically hidden

## 🎯 Feature Benefits

### **Centralized Control:**
- **Single Source**: All feature toggles in one file
- **Easy Management**: No need to edit multiple components
- **Environment Awareness**: Automatic dev/prod differences
- **Future-Proof**: Easy to add new features

### **Performance Optimization:**
- **Conditional Rendering**: Disabled features don't render
- **Bundle Size**: Unused features can be tree-shaken
- **Mobile Performance**: Heavy features excluded on mobile
- **Development Speed**: Quick feature testing

## 🚀 Adding New Features

### **Step 1: Add to Configuration**
```typescript
export interface FeatureConfig {
  // Existing features...
  newFeature: boolean;
}

export const FEATURES: FeatureConfig = {
  // Existing features...
  newFeature: true,
};
```

### **Step 2: Use in Components**
```typescript
import { FEATURES } from "@/config/features";

const MyComponent = () => {
  if (!FEATURES.newFeature) {
    return null; // Don't render if disabled
  }
  
  return <div>New Feature Content</div>;
};
```

### **Step 3: Add Development Helpers**
```typescript
// In features.ts development section
(window as any).features = {
  // Existing helpers...
  enableNewFeature: () => { FEATURES.newFeature = true; },
  disableNewFeature: () => { FEATURES.newFeature = false; },
};
```

## 📋 Quick Reference

### **Enable/Disable TOC:**
```typescript
// Enable
homepageTableOfContents: true

// Disable
homepageTableOfContents: false
```

### **Development Console Commands:**
```javascript
features.config                 // View all features
features.enableTOC()           // Enable table of contents
features.disableTOC()          // Disable table of contents
features.isEnabled('homepageTableOfContents') // Check if enabled
```

### **File Locations:**
- **Configuration**: `client/src/config/features.ts`
- **TOC Component**: `client/src/components/HomepageTableOfContents.tsx`
- **Usage**: `client/src/App.tsx`

## 🎛️ Current Feature Status

### **✅ Enabled Features:**
- Homepage Table of Contents
- Dark Mode Toggle
- Stock Ticker
- Blog Comments
- Admin Portal (dev only)
- SEO Tester (dev only)

### **⏸️ Disabled Features:**
- Firebase Analytics (until configured)

Your feature configuration system provides **professional control** over your portfolio's functionality with easy toggles and responsive behavior! 🎛️✨🎯
