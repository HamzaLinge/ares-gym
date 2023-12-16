import { NextFunction, Request, Response } from "express";

import { CustomError } from "../../types/global.type";
import {
  IRequest_command_delete,
  IRequest_command_get,
  IRequest_command_put_body,
  IRequest_command_put_params,
} from "./command.type";
import CommandModel, { ICommand } from "../../models/Command";
import { Roles } from "../authentication/auth.type";
import { HttpStatusCodes } from "../../utils/error.util";

export async function command_post_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}

export async function command_get_permission(
  req: Request<any, any, any, IRequest_command_get>,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.query?.idCommand
    );
    if (command && !command.user.equals(req.user?._id)) {
      next(
        new CustomError(
          "You don't have the permission to getting this command",
          HttpStatusCodes.UNAUTHORIZED
        )
      );
    } else {
      next();
    }
  } else {
    next();
  }
}

export async function command_put_permission(
  req: Request<IRequest_command_put_params, any, IRequest_command_put_body>,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role === Roles.subscriber) {
    if (req.body.status) {
      next(
        new CustomError(
          "You are not allowed to edit command status",
          HttpStatusCodes.UNAUTHORIZED
        )
      );
    }
    const command: ICommand | null = await CommandModel.findById(
      req.params?.idCommand
    );
    if (command && command.status.confirmed) {
      next(
        new CustomError(
          "The command has already been accepted",
          HttpStatusCodes.CONFLICT
        )
      );
    }
    if (command && !command.user.equals(req.user?._id)) {
      next(
        new CustomError(
          "You don't have the permission to edit this command",
          HttpStatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  } else {
    next();
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
    if (command && !command.user.equals(req.user?._id)) {
      return next(
        new CustomError(
          "You don't have the permission to delete this command",
          HttpStatusCodes.UNAUTHORIZED
        )
      );
    }
    if (command && command.status.confirmed) {
      return next(
        new CustomError(
          "The command has already been accepted",
          HttpStatusCodes.CONFLICT
        )
      );
    }
    next();
  }
}
