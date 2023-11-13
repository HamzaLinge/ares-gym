import { NextFunction, Request, Response } from "express";
import { CustomError, Roles } from "../../types/common.types";

export async function discount_post_permission(
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
  const user = req.user;
  if (!user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  next();
}

export async function discount_put_permission(
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
      new CustomError("You do not have the permission to edit a discount", 401)
    );
}

export async function discount_delete_permission(
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
        "You do not have the permission to delete a discount",
        401
      )
    );
}
