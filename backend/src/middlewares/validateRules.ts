import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { CustomError } from "../types/global.type";
import { HttpStatusCodes } from "../utils/error.util";

export const validateRules = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    next(
      new CustomError(
        "Error validation fields",
        HttpStatusCodes.BAD_REQUEST,
        errors.array()
      )
    );
  else next();
};
