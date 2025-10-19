require('dotenv').config({ path: './farmtrails.env' });
const mongoose = require('mongoose');

console.log('🔗 Connecting to MongoDB...');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Connected to MongoDB');
  
  // Define schemas
  const Product = mongoose.model('Product', new mongoose.Schema({
    name: String, description: String, price: Number, unit: String,
    images: [String], category: String, stock: Number, specifications: Object,
    is_active: Boolean, farmer: Object, created_at: Date
  }));
  
  const Tour = mongoose.model('Tour', new mongoose.Schema({
    name: String, description: String, price: Number, images: [String],
    duration: String, capacity: String, category: String, includes: [String],
    farmer: Object, is_active: Boolean, created_at: Date
  }));

  // Sample data
  const sampleProducts = [
    {
      name: "Organic Turmeric Powder",
      description: "Freshly harvested from our organic farm. Rich in curcumin with powerful anti-inflammatory effects.",
      price: 350, unit: "500gm", stock: 45,
      images: ["https://images.unsplash.com/photo-1615485500834-bc10199bc727?q=80&w=880"],
      category: "spices", is_active: true,
      specifications: { origin: "Punjab, India", shelf_life: "24 months", storage: "Cool, dry place" },
      farmer: { name: "Rajesh Kumar", farm: "Green Valley Organic Farm", location: "Punjab, India" }
    },
    {
      name: "Pure Forest Honey",
      description: "Raw, unfiltered honey collected from wildflowers in pristine forests.",
      price: 450, unit: "500gm", stock: 32,
      images: ["https://images.unsplash.com/photo-1559715546-f66295d5aaa5?ixlib=rb-4.0.3"],
      category: "dairy", is_active: true,
      specifications: { origin: "Himachal Pradesh, India", shelf_life: "18 months", storage: "Room temperature" },
      farmer: { name: "Sunita Devi", farm: "Sunny Bee Farms", location: "Himachal Pradesh, India" }
    },
    {
      name: "Organic Tomatoes",
      description: "Fresh, pesticide-free tomatoes grown in our organic farms. Rich in lycopene and vitamin C.",
      price: 80, unit: "kg", stock: 15,
      images: ["https://images.unsplash.com/photo-1546470427-e212b7d310ff?ixlib=rb-4.0.3"],
      category: "vegetables", is_active: true,
      specifications: { origin: "Karnataka, India", shelf_life: "7 days", storage: "Refrigerate" },
      farmer: { name: "Anil Reddy", farm: "Red Earth Farms", location: "Karnataka, India" }
    }
  ];

  const sampleTours = [
    {
      name: "Organic Vegetable Farm Tour",
      description: "Join us for a guided tour of our organic farm and learn about sustainable farming practices.",
      price: 499,
      images: ["https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?ixlib=rb-4.0.3"],
      duration: "2 hours", capacity: "15 people",
      category: "farm_tour", is_active: true,
      includes: ["Guided farm tour", "Vegetable picking", "Organic lunch", "Take-home produce"],
      farmer: { name: "Rajesh Kumar", farm: "Green Valley Organic Farm" }
    },
    {
      name: "Dairy Farm Experience",
      description: "Experience a day in the life of a dairy farmer with milking sessions and butter making.",
      price: 699,
      images: ["https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3"],
      duration: "3 hours", capacity: "10 people",
      category: "experience", is_active: true,
      includes: ["Milking session", "Butter making", "Farm fresh dairy products"],
      farmer: { name: "Gopal Yadav", farm: "Happy Cow Dairy" }
    }
  ];

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
})
.catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});