import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

/**
 * Express Application Configuration
 *
 * Here we configure middleware functions that process every incoming HTTP request
 * before it reaches our individual API routes.
 */
const app: Application = express();

// 1. Helmet: Sets various HTTP response headers to secure against common attacks (like XSS, clickjacking)
app.use(helmet());

// 2. CORS (Cross-Origin Resource Sharing):
// Controls which frontend websites are allowed to communicate with this backend.
// In development, our Vite React app will run on http://localhost:5173.
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Crucial: allows cookies (used for JWT authentication) to be sent across origins
  })
);

// 3. Body parsers:
// express.json() converts JSON request bodies into accessible JavaScript objects on req.body
app.use(express.json());
// express.urlencoded() parses URL-encoded bodies (from standard HTML forms)
app.use(express.urlencoded({ extended: true }));

// 4. HTTP Logger (Morgan):
// Prints formatted logs of incoming requests (method, path, status, response time) to the terminal
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// 5. Root status endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'HabitTracker API is active',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

export default app;
