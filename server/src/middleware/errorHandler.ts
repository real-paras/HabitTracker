import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors';

/**
 * Central Error Handler Middleware
 *
 * In Express, an error-handling middleware is identified by having exactly 4 parameters:
 * (err, req, res, next). Express will automatically skip regular route handlers
 * and jump straight to this function whenever any route or middleware calls `next(err)`.
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // 1. Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedIssues = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data provided.',
        details: formattedIssues,
      },
    });
    return;
  }

  // 2. Handle our custom application errors (BadRequest, NotFound, Unauthorized, etc.)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    });
    return;
  }

  // 3. Handle Mongoose CastError (e.g. malformed MongoDB ObjectId in URL params)
  if (err && typeof err === 'object' && 'name' in err && err.name === 'CastError') {
    res.status(400).json({
      error: {
        code: 'INVALID_ID',
        message: 'The provided resource ID is malformed.',
      },
    });
    return;
  }

  // 4. Handle MongoDB duplicate key errors (code 11000)
  if (err && typeof err === 'object' && 'code' in err && err.code === 11000) {
    res.status(409).json({
      error: {
        code: 'DUPLICATE_RESOURCE',
        message: 'A record with that unique value already exists.',
      },
    });
    return;
  }

  // 5. Fallback for unhandled / programmer errors (HTTP 500)
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const errorMessage = err instanceof Error ? err.message : 'Unknown server error';

  console.error('💥 Unhandled Exception:', err);

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isDevelopment ? errorMessage : 'An unexpected internal error occurred.',
      ...(isDevelopment && err instanceof Error ? { stack: err.stack } : {}),
    },
  });
};
