# FarmTrails Backend

Backend API for FarmTrails application using Express.js and MongoDB Atlas.

## ⚠️ IMPORTANT: Environment Setup

### First Time Setup

1. **Create your `.env` file** (DO NOT commit this file):
   ```bash
   cp .env.example .env
   ```

2. **Configure MongoDB Connection**:
   - Sign up for MongoDB Atlas: https://cloud.mongodb.com/
   - Create a new cluster (free tier available)
   - Get your connection string
   - Update `.env` file with your credentials:
     ```
     MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/farmtrails?retryWrites=true&w=majority
     PORT=5000
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Server**:
   ```bash
   npm start
   ```

## 🔒 Security Notes

- **NEVER** commit the `.env` file to git
- The `.env` file contains sensitive credentials
- Use `.env.example` as a template
- Each developer/environment should have their own `.env` file

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product
- `GET /api/tours` - Get all tours
- `POST /api/tours` - Add new tour

## Development

```bash
# Start with nodemon for auto-reload
npm run dev
```

## Deployment

When deploying to a hosting platform (Heroku, Railway, Render, etc.):

1. Set environment variables in your hosting platform's dashboard
2. Do NOT deploy the `.env` file
3. Ensure your MongoDB Atlas IP whitelist includes your hosting provider's IPs

## Troubleshooting

### "MONGODB_URI not loaded" error
- Check that `.env` file exists in the backend directory
- Verify the file is named exactly `.env` (not `.env.txt`)
- Ensure MONGODB_URI is spelled correctly

### Connection refused errors
- Check your MongoDB Atlas IP whitelist settings
- Verify your credentials are correct
- Ensure your cluster is running
