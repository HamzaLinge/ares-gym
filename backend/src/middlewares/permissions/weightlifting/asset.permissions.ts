import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../../types/common.types";
import { IRequest_weightlifting_asset_delete } from "../../../types/weightlifting/asset.types";

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
  else if (user.role === Roles.admin) return next();
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
  else if (user.role === Roles.admin) return next();
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
  else if (user.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to put weightlifting asset",
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
  else if (user.role === Roles.admin) return next();
  else
    next(
      new CustomError(
        "You do not have the permission to delete weightlifting asset",
        401
      )
    );
}
