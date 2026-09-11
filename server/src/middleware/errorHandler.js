/**
 * Global error-handling middleware.
 * Intercepts errors passed via next(err) and formats them into a clean JSON structure.
 */
const errorHandler = (err, req, res, next) => {
  // If headers have already been sent to the client, delegate to default Express handler
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found with the specified ID';
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  // Handle Mongoose Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 409;
    const duplicatedField = Object.keys(err.keyValue)[0];
    message = `A record with that ${duplicatedField} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      // Only include stack trace in development mode for security
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;