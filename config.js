// Frontend Configuration
// This file contains configuration values for the FarmTrails application
// NOTE: This file is tracked in Git with safe default values (no sensitive credentials)
// For local development with sensitive keys, create a local override or use environment variables

window.CONFIG = {
    // Backend API URL - Update this to your actual backend server URL
    API_BASE_URL: 'https://unobtrix-project-backend.onrender.com',
    
    // Microsoft Clarity Analytics ID (optional)
    // Leave empty if not using analytics
    // For production, add your Clarity ID via deployment environment
    CLARITY_PROJECT_ID: '',
    
    // Supabase Configuration (optional)
    // Leave empty if not using Supabase
    // For production with Supabase, add credentials via deployment environment
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: ''
};
