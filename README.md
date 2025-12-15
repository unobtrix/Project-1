# FarmTrails - Connecting Farmers with Customers

A web platform that connects farmers directly with customers for fresh produce and farm tours.

## 🚀 Quick Start

### Frontend Setup

1. **Configure the application**:
   - The `config.js` file is already included and will auto-detect your environment
   - For custom API URLs, edit `config.js` and update `API_BASE_URL`

2. **Serve the frontend**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Access the application**:
   - Open `http://localhost:8000/index.html` in your browser

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd farmtrails-backend
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Configure MongoDB**:
   - Sign up for MongoDB Atlas: https://cloud.mongodb.com/
   - Create a cluster and get your connection string
   - Update `.env` with your MongoDB credentials

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

See [farmtrails-backend/README.md](farmtrails-backend/README.md) for detailed backend documentation.

## 🔒 Security Notes

**IMPORTANT**: This repository now follows security best practices:

- ✅ No credentials committed to git
- ✅ `.env` files are properly ignored
- ✅ `node_modules` are not tracked
- ✅ Configuration templates provided (`.env.example`)

**Never commit**:
- `.env` files with credentials
- Database connection strings
- API keys or secrets

## 📁 Project Structure

```
Project-1/
├── index.html              # Login page
├── signup.html             # Registration page
├── customer.html           # Customer dashboard
├── farmerpage.html         # Farmer dashboard
├── product-details.html    # Product details page
├── payment.html            # Payment page
├── profile.html            # User profile page
├── help.html               # Help page
├── config.js               # Frontend configuration (auto-detects environment)
├── farmtrails-backend/     # Backend API
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment template
│   ├── .gitignore          # Backend-specific ignores
│   └── README.md           # Backend documentation
└── README.md               # This file
```

## 🛠️ Technology Stack

**Frontend**:
- HTML5, CSS3, JavaScript
- Responsive design
- Microsoft Clarity (optional analytics)

**Backend**:
- Node.js with Express
- MongoDB Atlas
- Mongoose ODM
- CORS enabled

## 🐛 Common Issues

### "config.js not found" error
- Make sure you're at the repository root
- The `config.js` file should be in the project root directory

### Backend connection errors
- Verify your `.env` file exists in `farmtrails-backend/`
- Check MongoDB Atlas IP whitelist settings
- Ensure credentials are correct

### CORS errors
- Check that the backend is running
- Verify `API_BASE_URL` in `config.js` matches your backend URL

## 📝 Recent Security Fixes

The following critical issues were identified and fixed:

1. **Exposed MongoDB Credentials** ✅ Fixed
   - Removed `farmtrails.env` from git tracking
   - Renamed to `.env` (standard naming)
   - Added `.env.example` template

2. **Missing Configuration File** ✅ Fixed
   - Created `config.js` for frontend
   - Added auto-detection for different environments

3. **Node Modules Committed** ✅ Fixed
   - Removed all node_modules from git
   - Added `.gitignore` to backend directory

4. **Security Scan** ✅ Passed
   - CodeQL scan completed with 0 vulnerabilities

## 📄 License

See [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Never commit sensitive credentials
2. Follow the existing code structure
3. Test your changes before committing
4. Keep dependencies up to date