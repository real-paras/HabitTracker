import dotenv from 'dotenv';

// Load environment variables from .env file into process.env before importing app
dotenv.config();

import app from './app';

/**
 * Server Entry Point
 *
 * This file starts the HTTP server listening on the configured PORT.
 * By separating app.ts (the Express setup) from server.ts (the network listener),
 * we make the app easy to test without actually opening a live port during tests.
 */
const PORT = process.env.PORT || 5000;

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
