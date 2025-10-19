// ==================== IMPORTS ====================
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables (Render/Vercel use system ENV)
dotenv.config();

// ==================== APP SETUP ====================
const app = express();

// CORS Configuration
// Allow your Netlify frontend to connect to this backend globally
const allowedOrigins = [
  "https://unobtrix.netlify.app",  // ✅ Your Netlify domain
  "http://localhost:5173",         // Optional: for local testing
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ==================== DEBUG INFO ====================
console.log("🔍 Environment Check:");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Loaded" : "❌ NOT LOADED");

// ==================== DATABASE CONNECTION ====================
console.log("🔗 Connecting to MongoDB Atlas...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("💡 Tips: Check your .env credentials & Atlas IP whitelist");
  });

// ==================== SCHEMAS ====================

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
    location: String,
  },
  created_at: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

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
    farm: String,
  },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

const Tour = mongoose.model("Tour", tourSchema);

// ==================== API ROUTES ====================

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "🌍 FarmTrails API is running globally!",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const { category, search, limit = 20 } = req.query;
    let query = { is_active: true };

    if (category && category !== "all") query.category = category;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "farmer.name": { $regex: search, $options: "i" } },
        { "farmer.farm": { $regex: search, $options: "i" } },
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

// Get product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, error: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all tours
app.get("/api/tours", async (req, res) => {
  try {
    const { search, limit = 10 } = req.query;
    let query = { is_active: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "farmer.name": { $regex: search, $options: "i" } },
        { "farmer.farm": { $regex: search, $options: "i" } },
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

// Add new tour
app.post("/api/tours", async (req, res) => {
  try {
    const tour = new Tour(req.body);
    await tour.save();
    res.json({ success: true, tour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== SERVER START ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running globally on port ${PORT}`);
  console.log(`🌐 Health check: /api/health`);
  console.log(`📦 Products API: /api/products`);
  console.log(`🎯 Tours API: /api/tours`);
});
