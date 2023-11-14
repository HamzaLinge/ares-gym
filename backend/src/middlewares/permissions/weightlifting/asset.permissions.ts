import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../../types/common.types";

export async function weightlifting_asset_create_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  else if (user.role === Roles.admin) next();
  else
    next(
      new CustomError(
        "You do not have the permission to create a weightlifting asset",
        401
      )
    );
}

export async function weightlifting_asset_get_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  else if (user.role === Roles.admin) next();
  else
    next(
      new CustomError(
        "You do not have the permission to get weightlifting asset",
        401
      )
    );
}

export async function weightlifting_asset_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  else if (user.role === Roles.admin) next();
  else
    next(
      new CustomError(
        "You do not have the permission to edit weightlifting asset",
        401
      )
    );
}

export async function weightlifting_asset_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  else if (user.role === Roles.admin) next();
  else
    next(
      new CustomError(
        "You do not have the permission to delete weightlifting asset",
        401
      )
    );
}
