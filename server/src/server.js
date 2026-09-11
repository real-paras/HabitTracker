require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

// Handle uncaught synchronous exceptions across the process
process.on('uncaughtException', (err) => {
  console.error('[Process Fatal] Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

// Initialize Database and Start HTTP Listener
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(
      `[Server] Running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
  });

  // Handle unhandled asynchronous promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('[Process Fatal] Unhandled Rejection:', err.message);
    server.close(() => {
      mongoose.connection.close(false, () => {
        process.exit(1);
      });
    });
  });

  // Graceful shutdown on termination signals (SIGINT / SIGTERM)
  const shutdown = (signal) => {
    console.log(`\n[Process] Received ${signal}. Gracefully terminating...`);
    server.close(async () => {
      try {
        await mongoose.connection.close(false);
        console.log('[Database] MongoDB connection closed.');
        process.exit(0);
      } catch (err) {
        console.error('[Database Error] Error during connection teardown:', err.message);
        process.exit(1);
      }
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer();