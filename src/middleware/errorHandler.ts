import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function notFoundHandler(_req: Request, res: Response, next: NextFunction) {
  next(new ApiError('Resource not found', 404));
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const payload: Record<string, unknown> = {
    message: err.message || 'Internal server error',
  };

  if (err instanceof ApiError && err.details) {
    payload.details = err.details;
  }

  res.status(statusCode).json(payload);
}
