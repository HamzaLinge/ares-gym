import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../types/common.type";
import {
  IRequest_command_delete,
  IRequest_command_put_body,
  IRequest_command_put_params,
} from "./command.type";
import CommandModel, { ICommand } from "../../models/Command";

export async function command_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}

export async function command_get_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}

export async function command_put_permission(
  req: Request<IRequest_command_put_params, any, IRequest_command_put_body>,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) {
    next();
  } else if (req.user?.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      next(new CustomError("There is no command found to edit", 404));
    } else if (
      !command.user.equals(req.user?._id) ||
      command.status.confirmed ||
      req.body.status
    ) {
      next(
        new CustomError(
          "You don't have the permission to edit this command",
          401
        )
      );
    } else {
      next();
    }
  }
}

export async function command_delete_permission(
  req: Request<IRequest_command_delete>,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.admin) {
    return next();
  }
  if (req.user?.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      return next(new CustomError("There is no command found to delete", 404));
    }
    if (!command.user.equals(req.user?._id) || command.status.confirmed) {
      return next(
        new CustomError(
          "You don't have the permission to delete this command",
          401
        )
      );
    }
    next();
  }
}
