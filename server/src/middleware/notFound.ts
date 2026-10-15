import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../utils/errors';

/**
 * 404 Not Found Middleware
 *
 * Placed after all registered routes. If an incoming request did not match
 * any defined route, this middleware triggers a clean 404 NotFoundError.
 */
export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};
