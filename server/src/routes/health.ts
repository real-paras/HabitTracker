import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * Health Check Router
 *
 * Exposes a lightweight status endpoint at GET /api/health.
 * Monitoring tools, deployment platforms, and frontend health checks use this
 * to confirm that the server is alive and functioning properly.
 */
const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
  });
});

export default router;
