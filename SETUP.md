# Quick Setup Guide

## Getting Started with FarmTrails

### 1. Configuration Setup

Before running the application, you need to create a configuration file:

```bash
# Copy the example configuration file
cp config.example.js config.js
```

Then edit `config.js` with your actual values:
- Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` with your Supabase project credentials
- Optionally set `CLARITY_PROJECT_ID` for analytics
- Update `API_BASE_URL` if you have a custom backend

### 2. Open the Application

Simply open `index.html` or `farmerpage.html` in your web browser.

For a better development experience, you can use a local server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (if http-server is installed)
npx http-server -p 8080
```

Then navigate to `http://localhost:8080` in your browser.

### 3. Important Notes

- **Security**: Never commit your `config.js` file to version control
- The application will work with limited functionality even without valid Supabase credentials
- Some external resources (like images and CDN libraries) may be blocked by ad blockers

For more detailed configuration options, see [CONFIG-README.md](CONFIG-README.md).
