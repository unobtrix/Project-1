/**
 * Environment Configuration Module for FarmTrails
 * Loads environment variables from Netlify and makes them available globally
 * 
 * Netlify Environment Variables to set:
 * - REACT_APP_API_BASE_URL
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_ANON_KEY
 * - REACT_APP_CLARITY_PROJECT_ID
 * - REACT_APP_ENV
 */

(function() {
  // Initialize global CONFIG object
  window.CONFIG = window.CONFIG || {};

  // Function to get environment variable from Netlify context
  function getEnvVariable(key, defaultValue) {
    // Check multiple possible sources for environment variables
    
    // 1. Netlify build environment (if available)
    if (typeof window.__NETLIFY__ !== 'undefined' && window.__NETLIFY__.env) {
      if (window.__NETLIFY__.env[key]) {
        return window.__NETLIFY__.env[key];
      }
    }
    
    // 2. Meta tags (alternative method - set these in your HTML)
    const metaTag = document.querySelector(`meta[name="env-${key.toLowerCase()}"]`);
    if (metaTag) {
      return metaTag.getAttribute('content');
    }
    
    // 3. Window object (can be set by Netlify functions)
    if (window[key]) {
      return window[key];
    }
    
    // 4. Return default value
    return defaultValue;
  }

  // Helper: try multiple keys for a single logical config value
  function pickEnv(keys, fallback) {
    for (const k of keys) {
      const val = getEnvVariable(k, undefined);
      if (val !== undefined && val !== '') return val;
    }
    return fallback;
  }

  // Set configuration from environment variables (supports multiple naming conventions)
  window.CONFIG = {
    // API Configuration
    API_BASE_URL: pickEnv([
      'NEXT_PUBLIC_API_URL',
      'REACT_APP_API_BASE_URL',
      'API_BASE_URL'
    ], getDefaultApiUrl()),
    
    // Supabase Configuration
    SUPABASE_URL: pickEnv([
      'SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_URL',
      'REACT_APP_SUPABASE_URL'
    ], ''),
    SUPABASE_ANON_KEY: pickEnv([
      'SUPABASE_ANON_KEY',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'REACT_APP_SUPABASE_ANON_KEY'
    ], ''),
    
    // Microsoft Clarity Configuration
    CLARITY_PROJECT_ID: pickEnv([
      'CLARITY_PROJECT_ID',
      'NEXT_PUBLIC_CLARITY_PROJECT_ID',
      'REACT_APP_CLARITY_PROJECT_ID'
    ], 'tu6s87m19d'),
    
    // Environment
    ENV: pickEnv(['REACT_APP_ENV', 'NEXT_PUBLIC_ENV', 'NODE_ENV'], 'production'),
  };

  /**
   * Get default API URL based on current environment
   */
  function getDefaultApiUrl() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return 'http://localhost:5000';
    }
    
    // Production default
    return 'https://unobtrix-project-backend.onrender.com';
  }

  // Development logging
  if (window.CONFIG.ENV === 'development' || window.CONFIG.ENV === 'staging') {
    console.log('%c🔧 FarmTrails Configuration Loaded', 'color: #4CAF50; font-weight: bold;', {
      API_BASE_URL: window.CONFIG.API_BASE_URL,
      SUPABASE_URL: window.CONFIG.SUPABASE_URL ? '✓ Configured' : '✗ Not configured',
      SUPABASE_ANON_KEY: window.CONFIG.SUPABASE_ANON_KEY ? '✓ Configured' : '✗ Not configured',
      CLARITY_PROJECT_ID: window.CONFIG.CLARITY_PROJECT_ID || '✓ Configured',
      Environment: window.CONFIG.ENV,
    });
  }
})();
