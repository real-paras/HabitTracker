const mongoose = require('mongoose');

/**
 * Establishes a cached connection to MongoDB using Mongoose.
 * Exits the process if the initial connection fails.
 */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Modern Mongoose handles connection pooling automatically
      autoIndex: process.env.NODE_ENV !== 'production', // Build indexes in dev; disable in production for performance
    });

    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);

    // Event listeners for connection lifecycle
    mongoose.connection.on('error', (err) => {
      console.error(`[Database Error] Connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database Warning] MongoDB connection lost. Attempting reconnect...');
    });
  } catch (error) {
    console.error(`[Database Critical] Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;