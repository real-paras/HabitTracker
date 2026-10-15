import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiLimiter } from './middleware/rateLimit';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

import healthRouter from './routes/health';

/**
 * Express Application Configuration
 *
 * Configures global middleware and error handling pipeline.
 */
const app: Application = express();

// 1. Helmet: Secure HTTP headers
app.use(helmet());

// 2. CORS: Cross-Origin Resource Sharing
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Enables cookies for authentication
  })
);

// 3. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Request logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 5. Rate Limiting for all API routes
app.use('/api', apiLimiter);

// 6. Base API routes
app.use('/api', healthRouter);

// 7. Root check endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'HabitTracker API is active',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// 7. Not Found (404) Handler: catches any request that did not match an existing route
app.use(notFound);

// 8. Central Error Handler: catches any errors forwarded via next(err)
app.use(errorHandler);

export default app;
