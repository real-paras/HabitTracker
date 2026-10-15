import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 *
 * Prevents denial-of-service (DoS) and brute-force attacks by limiting
 * how many requests a single IP address can make within a given time window.
 */

// General API rate limiter: 100 requests per 15-minute window
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true, // Return standard RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP. Please try again after 15 minutes.',
    },
  },
});

// Strict authentication rate limiter: 10 attempts per 15-minute window
// Protects login and signup endpoints from brute-force password guessing
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again in 15 minutes.',
    },
  },
});
