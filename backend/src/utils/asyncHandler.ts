import { Request, Response, NextFunction } from 'express';

// Wrapper to automatically catch errors in async route handlers and pass them to the Express error middleware
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
