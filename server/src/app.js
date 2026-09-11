const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ==========================================
// Base Middlewares
// ==========================================

// Enable CORS for client access
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// HTTP request logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middlewares
app.use(express.json({ limit: '10kb' })); // Restrict payload size to prevent DoS attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==========================================
// System Health Check Endpoint
// ==========================================
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// ==========================================
// 404 Route Catch-All
// ==========================================
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// ==========================================
// Centralized Error Handling Middleware
// ==========================================
app.use(errorHandler);

module.exports = app;