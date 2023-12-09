import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../types/common.types";

export async function shopping_protein_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else if (user.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to create a new protein",
        401
      )
    );
  }
}

export async function shopping_protein_get_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else {
    next();
  }
}

export async function shopping_protein_put_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else if (user.role === Roles.admin) next();
  else {
    next(
      new CustomError("You do not have the permission to edit protein", 401)
    );
  }
}

export async function shopping_protein_put_files_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else if (user.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to upload protein files",
        401
      )
    );
  }
}

export async function shopping_protein_delete_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else if (user.role === Roles.admin) next();
  else {
    next(
      new CustomError("You do not have the permission to delete protein", 401)
    );
  }
}

export async function shopping_protein_delete_file_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (!user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        404
      )
    );
  } else if (user.role === Roles.admin) next();
  else {
    next(
      new CustomError(
        "You do not have the permission to delete protein file",
        401
      )
    );
  }
}
