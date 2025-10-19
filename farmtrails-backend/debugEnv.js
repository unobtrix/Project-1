require('dotenv').config();

console.log('🔍 Debugging environment variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Found' : '❌ NOT FOUND');
console.log('PORT:', process.env.PORT);
console.log('All env variables:', process.env);

// Test if .env file is being read
if (!process.env.MONGODB_URI) {
  console.log('\n❌ PROBLEM: MONGODB_URI is not loading');
  console.log('💡 Check:');
  console.log('1. Is .env file in the same folder?');
  console.log('2. Is the filename exactly ".env" (not .env.txt)?');
  console.log('3. Is the MONGODB_URI spelled correctly?');
}