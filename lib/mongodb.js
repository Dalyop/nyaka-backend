const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Create a new client for development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create a new client for production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a function that returns the client promise
module.exports = async function dbConnect() {
  if (!clientPromise) {
    throw new Error('MongoDB client promise is not initialized');
  }
  return clientPromise;
};