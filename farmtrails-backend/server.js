// Load from custom .env file name
require('dotenv').config({ path: './farmtrails.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Debug
console.log('🔍 Environment Check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ NOT LOADED');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
console.log('🔗 Connecting to MongoDB Atlas...');
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Tips: Check your password in .env file and IP whitelist in MongoDB Atlas');
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
  res.json({ 
    success: true, 
    message: 'FarmTrails API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, limit = 20 } = req.query;
    let query = { is_active: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'farmer.name': { $regex: search, $options: 'i' } },
        { 'farmer.farm': { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(query)
      .limit(parseInt(limit))
      .sort({ created_at: -1 });
    
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all tours
app.get('/api/tours', async (req, res) => {
  try {
    const { search, limit = 10 } = req.query;
    let query = { is_active: true };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'farmer.name': { $regex: search, $options: 'i' } },
        { 'farmer.farm': { $regex: search, $options: 'i' } }
      ];
    }
    
    const tours = await Tour.find(query)
      .limit(parseInt(limit))
      .sort({ created_at: -1 });
    
    res.json({ success: true, tours });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new product (for farmers)
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new tour (for farmers)
app.post('/api/tours', async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.json({ success: true, tour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🎯 Tours API: http://localhost:${PORT}/api/tours`);
});