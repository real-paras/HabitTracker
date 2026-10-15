import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';

interface ValidationSchema {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

/**
 * Zod Request Validation Middleware Factory
 *
 * Validates incoming `req.body`, `req.query`, and/or `req.params` against a Zod schema.
 * If validation fails, it forwards the ZodError directly to our errorHandler.
 * If validation succeeds, it assigns the cleanly parsed and type-coerced data back to req.
 *
 * Example usage:
 *   router.post('/login', validate({ body: loginSchema }), loginController);
 */
export const validate = (schema: ValidationSchema) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        const parsedQuery = await schema.query.parseAsync(req.query);
        req.query = parsedQuery as Request['query'];
      }
      if (schema.params) {
        const parsedParams = await schema.params.parseAsync(req.params);
        req.params = parsedParams as Request['params'];
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      } else {
        next(error);
      }
    }
  };
};
