import mongoose from 'mongoose';

/**
 * MongoDB Connection Handler
 *
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 * It provides schema validation, type casting, query building, and business logic hooks.
 */
export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in server/.env');
    console.error('   Please add your MongoDB Atlas connection string to server/.env:');
    console.error('   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/habittracker?retryWrites=true&w=majority');
    throw new Error('MONGODB_URI is missing from environment variables');
  }

  try {
    // strictQuery enforces that only fields specified in our Mongoose schemas are saved/queried
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(uri, {
      autoIndex: process.env.NODE_ENV !== 'production', // Build indexes automatically in dev; disable in production for performance
    });

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);

    // Lifecycle events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB runtime error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${(error as Error).message}`);
    throw error;
  }
};
