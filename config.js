// Configuration file for FarmTrails frontend
// This file provides centralized configuration for the application

window.CONFIG = {
  // API Base URL - Change this based on your environment
  // Leave as empty string to use auto-detection
  API_BASE_URL: '', // Set to your actual backend URL or leave empty for auto-detection
  
  // Microsoft Clarity Project ID (optional)
  // Get your project ID from https://clarity.microsoft.com/
  CLARITY_PROJECT_ID: '', // Leave empty to disable analytics
  
  // Environment detection
  IS_PRODUCTION: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
  
  // Feature flags
  FEATURES: {
    ANALYTICS_ENABLED: false, // Set to true when CLARITY_PROJECT_ID is provided
    DEBUG_MODE: false, // Enable for development debugging
  }
};

// Auto-configure API URL based on environment if not explicitly set
if (!window.CONFIG.API_BASE_URL) {
  // Default configuration for different environments
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Local development
    window.CONFIG.API_BASE_URL = 'http://localhost:5000';
  } else if (window.location.hostname.includes('netlify.app')) {
    // Netlify deployment - Set your actual backend URL in the CONFIG above
    // This is a fallback; you should configure API_BASE_URL explicitly for production
    console.warn('⚠️ Using default API URL. Please configure API_BASE_URL in config.js');
    window.CONFIG.API_BASE_URL = 'http://localhost:5000'; // Update this!
  }
}

console.log('🔧 FarmTrails Configuration Loaded:', {
  environment: window.CONFIG.IS_PRODUCTION ? 'Production' : 'Development',
  apiBaseUrl: window.CONFIG.API_BASE_URL,
  analyticsEnabled: window.CONFIG.FEATURES.ANALYTICS_ENABLED
});
