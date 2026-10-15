import dotenv from 'dotenv';

// Load environment variables before importing app or config
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // 1. Connect to MongoDB database
    await connectDB();

    // 2. Start listening on HTTP port
    const server = app.listen(PORT, () => {
      console.log(`🚀 HabitTracker Server listening on port ${PORT}`);
      console.log(`   URL: http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown handling
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server gracefully');
      server.close(() => {
        console.log('HTTP server closed');
      });
    });

    process.on('SIGINT', () => {
      console.log('\nSIGINT signal received: closing HTTP server gracefully');
      server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to connect to database during startup:', (error as Error).message);
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Server started in development mode without MongoDB connection.');
      console.warn('   Add a valid MONGODB_URI to server/.env to enable database features.');
      app.listen(PORT, () => {
        console.log(`🚀 HabitTracker Server listening on port ${PORT} (Database Pending)`);
      });
    } else {
      process.exit(1);
    }
  }
};

startServer();
