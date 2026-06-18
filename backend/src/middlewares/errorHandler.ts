import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Handle Zod Validation Errors
  if (err instanceof z.ZodError) {
    const formattedErrors: Record<string, string> = {};
    err.errors.forEach((e) => {
      if (e.path.length > 0) {
        formattedErrors[e.path[0].toString()] = e.message;
      }
    });
    return res.status(400).json({
      error: "Validation failed",
      details: formattedErrors,
    });
  }

  // Handle Prisma Database Errors
  if (err.code === 'P2025') {
    return res.status(404).json({ error: "Application not found" });
  }
  if (err.code === 'P2023') {
    return res.status(400).json({ error: "Invalid ID format provided" });
  }

  // Handle generic errors
  console.error("Unhandled Error:", err);
  return res.status(500).json({ error: "An unexpected error occurred on the server" });
};
