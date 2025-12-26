# Netlify Environment Variables Setup Guide

## 📋 Overview

Your FarmTrails application currently uses a static `config.js` file. This guide shows how to migrate to Netlify environment variables for better security and flexibility.

## 🚀 Quick Setup

### Step 1: Update HTML Files

Replace this line:
```html
<script src="config.js"></script>
```

With this:
```html
<!-- Load environment configuration from Netlify variables -->
<script src="env-config.html"></script>
```

### Step 2: Set Environment Variables in Netlify Dashboard

1. Go to **Netlify Dashboard** → Your Site → **Site Settings** → **Build & Deploy** → **Environment**
2. Click **Edit variables**
3. Add these variables:

| Variable Name | Example Value | Description |
|---|---|---|
| `REACT_APP_API_BASE_URL` | `https://unobtrix-project-backend.onrender.com` | Your backend API URL |
| `REACT_APP_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | `xxx` | Supabase anonymous key |
| `REACT_APP_CLARITY_PROJECT_ID` | `tu6s87m19d` | Microsoft Clarity project ID |
| `REACT_APP_ENV` | `production` | Environment name |

### Step 3: Alternative - Using netlify.toml

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = "public"

[build.environment]
  REACT_APP_API_BASE_URL = "http://localhost:5000"
  REACT_APP_ENV = "development"

[context.production]
  environment = { REACT_APP_API_BASE_URL = "https://unobtrix-project-backend.onrender.com", REACT_APP_ENV = "production" }
```

## 📝 Files Modified

### 1. `env-config.html` ✅ (NEW)
- Replaces the static config.js
- Reads from Netlify environment variables
- Provides fallback defaults
- Should be included in HEAD before other scripts

### 2. Update Your HTML Files

#### index.html
```html
<!-- OLD -->
<script src="config.js"></script>

<!-- NEW -->
<script src="env-config.html"></script>
```

#### signup.html
```html
<!-- OLD -->
<script src="config.js"></script>

<!-- NEW -->
<script src="env-config.html"></script>
```

#### customer.html
```html
<!-- OLD -->
<script src="config.js"></script>

<!-- NEW -->
<script src="env-config.html"></script>
```

#### farmerpage.html
```html
<!-- OLD -->
<script src="config.js"></script>

<!-- NEW -->
<script src="env-config.html"></script>
```

#### profile.html
```html
<!-- OLD -->
<script src="config.js"></script>

<!-- NEW -->
<script src="env-config.html"></script>
```

## 🔒 Security Best Practices

1. **Never commit sensitive keys** to git
2. **Use Netlify's secure environment variable storage**
3. **Set different variables per environment** (production, staging, preview)
4. **Mark sensitive variables** as "Decrypt during deployment" in Netlify

## 🧪 Testing Locally

For local development, you have two options:

### Option A: Use netlify.toml
```bash
npm install -g netlify-cli
netlify dev
```

### Option B: Create a local .env file
Create `.env` in your project root:
```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_ENV=development
```

Then access it via:
```javascript
const apiUrl = window.CONFIG.API_BASE_URL || 'http://localhost:5000';
```

## 🔄 How It Works

1. **env-config.html** runs when your page loads
2. It checks multiple sources for environment variables (in order):
   - Netlify build environment variables
   - Meta tags in HTML
   - Window object properties
   - Defaults based on hostname
3. Makes `window.CONFIG` globally available to all scripts
4. All your existing code using `window.CONFIG.API_BASE_URL` etc. continues to work

## ✅ Verification Checklist

- [ ] Created `env-config.html` in your Project-1 folder
- [ ] Updated all HTML files to use `<script src="env-config.html"></script>`
- [ ] Set environment variables in Netlify Dashboard
- [ ] Tested locally with `netlify dev`
- [ ] Deployed to Netlify and verified variables are loaded
- [ ] Check browser console for "🔧 FarmTrails Configuration Loaded" message

## 📊 Example Console Output

When loading your site, you should see:
```
🔧 FarmTrails Configuration Loaded
{
  API_BASE_URL: "https://unobtrix-project-backend.onrender.com",
  SUPABASE_URL: "✓ Configured",
  SUPABASE_ANON_KEY: "✓ Configured",
  CLARITY_PROJECT_ID: "✓ Configured",
  Environment: "production"
}
```

## 🐛 Troubleshooting

**Issue: CONFIG is undefined**
- Ensure `env-config.html` is loaded BEFORE other scripts that use CONFIG
- Check that the script tag is in the `<head>` section

**Issue: Variables not loading from Netlify**
- Verify environment variables are set in Netlify Dashboard
- Redeploy your site after adding variables
- Check that variable names match exactly (case-sensitive)

**Issue: Using hardcoded API URL instead of Netlify variable**
- Make sure you're using `window.CONFIG.API_BASE_URL` in your code
- Check that API_BASE_URL is properly set in Netlify environment variables

## 🚀 Next Steps

1. Update all your HTML files with the new config loader
2. Set up environment variables in Netlify
3. Deploy and test
4. You can now safely remove the old `config.js` file

---

**Questions?** Check the browser console for helpful debug messages!
