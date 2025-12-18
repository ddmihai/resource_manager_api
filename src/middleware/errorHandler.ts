import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class ApiError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Resource not found',
    path: req.originalUrl
  });
};

// Global error handler with a friendly JSON response.
// Disable eslint unused vars for next param because Express needs 4 args to detect error middleware.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof ApiError ? err.status : 500;

  if (status >= 500) {
    logger.error(err.message, err.stack);
  } else {
    logger.warn(err.message);
  }

  res.status(status).json({
    message: err.message || 'Internal server error'
  });
};
