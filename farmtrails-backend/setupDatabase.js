require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  unit: String,
  images: [String],
  category: String,
  stock: Number,
  specifications: Object,
  is_active: Boolean,
  farmer: Object,
  created_at: Date
}));

const Tour = mongoose.model('Tour', new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  images: [String],
  duration: String,
  capacity: String,
  category: String,
  includes: [String],
  farmer: Object,
  is_active: Boolean,
  created_at: Date
}));

const sampleProducts = [
  {
    name: "Organic Turmeric Powder",
    description: "Freshly harvested from our organic farm. Rich in curcumin with powerful anti-inflammatory effects.",
    price: 350,
    unit: "500gm",
    images: ["https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=880&auto=format&fit=crop"],
    category: "spices",
    stock: 45,
    specifications: {
      origin: "Punjab, India",
      shelf_life: "24 months",
      storage: "Cool, dry place"
    },
    farmer: {
      name: "Rajesh Kumar",
      farm: "Green Valley Organic Farm",
      location: "Punjab, India"
    },
    is_active: true
  },
  {
    name: "Pure Forest Honey",
    description: "Raw, unfiltered honey collected from wildflowers in pristine forests.",
    price: 450,
    unit: "500gm",
    images: ["https://images.unsplash.com/photo-1559715546-f66295d5aaa5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"],
    category: "dairy",
    stock: 32,
    specifications: {
      origin: "Himachal Pradesh, India",
      shelf_life: "18 months",
      storage: "Room temperature"
    },
    farmer: {
      name: "Sunita Devi",
      farm: "Sunny Bee Farms",
      location: "Himachal Pradesh, India"
    },
    is_active: true
  },
  {
    name: "Organic Tomatoes",
    description: "Fresh, pesticide-free tomatoes grown in our organic farms. Rich in lycopene and vitamin C.",
    price: 80,
    unit: "kg",
    images: ["https://images.unsplash.com/photo-1546470427-e212b7d310ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"],
    category: "vegetables",
    stock: 15,
    specifications: {
      origin: "Karnataka, India",
      shelf_life: "7 days",
      storage: "Refrigerate"
    },
    farmer: {
      name: "Anil Reddy",
      farm: "Red Earth Farms",
      location: "Karnataka, India"
    },
    is_active: true
  }
];

const sampleTours = [
  {
    name: "Organic Vegetable Farm Tour",
    description: "Join us for a guided tour of our organic farm and learn about sustainable farming practices.",
    price: 499,
    images: ["https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"],
    duration: "2 hours",
    capacity: "15 people",
    category: "farm_tour",
    includes: ["Guided farm tour", "Vegetable picking", "Organic lunch", "Take-home produce"],
    farmer: {
      name: "Rajesh Kumar",
      farm: "Green Valley Organic Farm"
    },
    is_active: true
  },
  {
    name: "Dairy Farm Experience",
    description: "Experience a day in the life of a dairy farmer with milking sessions and butter making.",
    price: 699,
    images: ["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"],
    duration: "3 hours",
    capacity: "10 people",
    category: "experience",
    includes: ["Milking session", "Butter making", "Farm fresh dairy products"],
    farmer: {
      name: "Gopal Yadav",
      farm: "Happy Cow Dairy"
    },
    is_active: true
  }
];

async function setupDatabase() {
  try {
    console.log('🗑️ Clearing existing data...');
    await Product.deleteMany({});
    await Tour.deleteMany({});
    
    console.log('📥 Inserting sample products...');
    await Product.insertMany(sampleProducts);
    
    console.log('🎯 Inserting sample tours...');
    await Tour.insertMany(sampleTours);
    
    console.log('✅ Database setup completed successfully!');
    console.log(`📦 Added ${sampleProducts.length} products`);
    console.log(`🎯 Added ${sampleTours.length} tours`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();