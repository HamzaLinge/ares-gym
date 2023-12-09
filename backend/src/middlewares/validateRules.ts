import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { CustomError } from "../types/common.types";

export const validateRules = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    next(new CustomError("Error validation fields", 400, errors.array()));
  else next();
};
