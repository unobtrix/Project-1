// Use custom .env filename
require('dotenv').config({ path: './farmtrails.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Debug environment variables
console.log('🔍 Environment Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ NOT LOADED');
console.log('PORT:', process.env.PORT);

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in farmtrails.env');
  console.log('💡 Please check your farmtrails.env file contains:');
  console.log('MONGODB_URI=mongodb+srv://unobtrix1_db_user:YOUR_PASSWORD@cluster0.jrxp1my.mongodb.net/farmtrails?retryWrites=true&w=majority');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('🔗 Connecting to MongoDB Atlas...');
console.log('Using connection string:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Troubleshooting:');
  console.log('1. Check your password in farmtrails.env');
  console.log('2. Check IP whitelist in MongoDB Atlas');
  console.log('3. Check if database "farmtrails" exists');
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  unit: String,
  images: [String],
  category: String,
  stock: { type: Number, default: 0 },
  specifications: Object,
  is_active: { type: Boolean, default: true },
  farmer: {
    name: String,
    farm: String,
    location: String
  },
  created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

// Tour Schema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  duration: String,
  capacity: String,
  category: String,
  includes: [String],
  farmer: {
    name: String,
    farm: String
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now }
});

const Tour = mongoose.model('Tour', tourSchema);

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    success: true, 
    message: 'FarmTrails API is running!',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({ is_active: true }).sort({ created_at: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all tours
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find({ is_active: true }).sort({ created_at: -1 });
    res.json({ success: true, tours });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup database
app.post('/api/setup-database', async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Organic Turmeric Powder",
        description: "Freshly harvested from our organic farm.",
        price: 350, unit: "500gm", stock: 45,
        images: ["https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=880"],
        category: "spices", is_active: true,
        farmer: { name: "Rajesh Kumar", farm: "Green Valley Organic Farm", location: "Punjab, India" }
      },
      {
        name: "Pure Forest Honey",
        description: "Raw, unfiltered honey from wildflowers.",
        price: 450, unit: "500gm", stock: 32,
        images: ["https://images.unsplash.com/photo-1559715546-f66295d5aaa5?ixlib=rb-4.0.3"],
        category: "dairy", is_active: true,
        farmer: { name: "Sunita Devi", farm: "Sunny Bee Farms", location: "Himachal Pradesh, India" }
      }
    ];

    const sampleTours = [
      {
        name: "Organic Vegetable Farm Tour",
        description: "Guided tour of our organic farm.",
        price: 499,
        images: ["https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?ixlib=rb-4.0.3"],
        duration: "2 hours", capacity: "15 people",
        category: "farm_tour", is_active: true,
        includes: ["Guided farm tour", "Vegetable picking", "Organic lunch"],
        farmer: { name: "Rajesh Kumar", farm: "Green Valley Organic Farm" }
      }
    ];

    await Product.deleteMany({});
    await Tour.deleteMany({});
    
    await Product.insertMany(sampleProducts);
    await Tour.insertMany(sampleTours);
    
    res.json({ success: true, message: 'Database setup complete!', products: 2, tours: 1 });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
  console.log(`🎯 Tours: http://localhost:${PORT}/api/tours`);
  console.log(`🛠️ Setup: http://localhost:${PORT}/api/setup-database (POST)`);
});