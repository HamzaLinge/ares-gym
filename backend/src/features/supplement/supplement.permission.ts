import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../types/common.type";

export async function supplement_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to create a new supplement",
        401
      )
    );
  }
}

export async function supplement_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) next();
  else {
    next(
      new CustomError("You do not have the permission to edit supplement", 401)
    );
  }
}

export async function supplement_put_files_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to upload supplement files",
        401
      )
    );
  }
}

export async function supplement_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to delete supplement",
        401
      )
    );
  }
}

export async function supplement_delete_file_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to delete supplement file",
        401
      )
    );
  }
}
