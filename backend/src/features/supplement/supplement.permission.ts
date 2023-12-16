import { NextFunction, Request, Response } from "express";

import { CustomError } from "../../types/global.type";
import { Roles } from "../authentication/auth.type";
import { HttpStatusCodes } from "../../utils/error.util";

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
        HttpStatusCodes.UNAUTHORIZED
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
      new CustomError(
        "You do not have the permission to edit supplement",
        HttpStatusCodes.UNAUTHORIZED
      )
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
        HttpStatusCodes.UNAUTHORIZED
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
        HttpStatusCodes.UNAUTHORIZED
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
        HttpStatusCodes.UNAUTHORIZED
      )
    );
  }
}
