import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../types/common.type";

export async function discount_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to create a discount",
        401
      )
    );
}

export async function discount_get_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}

export async function discount_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError("You do not have the permission to edit a discount", 401)
    );
}

export async function discount_file_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to upload a discount file",
        401
      )
    );
}

export async function discount_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to delete a discount",
        401
      )
    );
}

export async function discount_file_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to delete a discount file",
        401
      )
    );
}
