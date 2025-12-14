# Frontend Configuration Security

## Overview
This project uses external configuration files to keep sensitive information out of the public repository and browser developer tools.

## Files
- config.js - **NOT COMMITTED** - Contains actual configuration values
- config.local.js - Template for local development
- config.production.js - Template for production deployment
- .gitignore - Excludes sensitive config files from version control

## Setup Instructions

### 1. For Local Development
`ash
cp config.local.js config.js
# Edit config.js with your local values
`

### 2. For Production Deployment
`ash
cp config.production.js config.js
# Edit config.js with your production values
`

### 3. Never Commit config.js
The config.js file is excluded from Git. Share configuration values securely with your team.

## Configuration Options

`javascript
const CONFIG = {
    // Backend API URL
    API_BASE_URL: 'https://your-backend.com',
    
    // Microsoft Clarity Analytics ID
    CLARITY_PROJECT_ID: 'your-project-id',
    
    // Supabase Configuration
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key'
};
`

## Security Benefits
- Sensitive data not visible in GitHub repository
- Configuration not exposed in browser developer tools
- Environment-specific settings (dev/staging/prod)
- Easy to update without code changes

## Important Notes
- Always use HTTPS URLs in production
- Keep Supabase keys secure and rotate regularly
- Analytics IDs can be used for tracking - consider user privacy
- Test configuration changes thoroughly before deployment