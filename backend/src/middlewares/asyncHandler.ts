/**
 * asyncHandler - A higher-order function for wrapping Express route handlers.
 * It catches any unhandled errors in asynchronous route handlers and automatically
 * forwards them to the next middleware in the chain, typically the centralized error
 * handling middleware. This eliminates the need for repetitive try-catch blocks
 * in each asynchronous handler. For intentional error handling, where errors
 * are explicitly passed using next(new CustomError()), asyncHandler allows
 * Express to handle the error propagation directly to the centralized error handler.
 */

import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
