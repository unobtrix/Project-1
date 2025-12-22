// Configuration file template for FarmTrails application
// Copy this file to config.js and update with your actual values
// This file contains configuration for external services

const CONFIG = {
    // Backend API URL - Update with your backend URL
    API_BASE_URL: 'http://localhost:3000',
    
    // Microsoft Clarity Analytics ID (optional)
    // Leave empty to disable analytics
    CLARITY_PROJECT_ID: '',
    
    // Supabase Configuration
    // Replace with your actual Supabase project credentials
    // Get these from: https://app.supabase.com/project/_/settings/api
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key-here'
};

// Make CONFIG available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
