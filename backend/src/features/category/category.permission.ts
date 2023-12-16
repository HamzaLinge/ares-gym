import { NextFunction, Request, Response } from "express";

import { CustomError } from "../../types/global.type";
import { Roles } from "../authentication/auth.type";
import { HttpStatusCodes } from "../../utils/error.util";

export async function category_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to create a category",
        HttpStatusCodes.UNAUTHORIZED
      )
    );
}
export async function category_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to edit a category",
        HttpStatusCodes.UNAUTHORIZED
      )
    );
}
export async function category_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to delete a category",
        HttpStatusCodes.UNAUTHORIZED
      )
    );
}
