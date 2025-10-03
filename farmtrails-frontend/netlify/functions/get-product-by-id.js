const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

exports.handler = async function(event, context) {
  const { id } = event.queryStringParameters;
  
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Product ID required' }) };
  }

  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const products = database.collection('products');
    
    const product = await products.findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Product not found' }) };
    }
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(product)
    };
    
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  } finally {
    await client.close();
  }
};