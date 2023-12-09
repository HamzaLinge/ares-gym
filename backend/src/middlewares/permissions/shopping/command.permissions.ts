import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../../types/common.types";
import {
  IRequest_shopping_command_delete,
  IRequest_shopping_command_discount_file_delete,
  IRequest_shopping_command_discount_files_put,
  IRequest_shopping_command_put_body,
  IRequest_shopping_command_put_params,
} from "../../../types/shopping/command.types";
import CommandModel, { ICommand } from "../../../models/Commands";

export async function shopping_command_post_permission(
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

export async function shopping_command_get_permission(
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

export async function shopping_command_put_permission(
  req: Request<
    IRequest_shopping_command_put_params,
    any,
    IRequest_shopping_command_put_body
  >,
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
  } else if (user.role === Roles.admin) {
    next();
  } else if (user.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      next(new CustomError("There is no command found to edit", 404));
    } else if (!command.user.equals(user._id) || command.status.confirmed) {
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

export async function shopping_command_confirm_put_permission(
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
  } else if (user.role === Roles.admin) {
    next();
  } else {
    next(
      new CustomError("You don't have the permission to confirm a command", 401)
    );
  }
}

export async function shopping_command_discount_files_put_permission(
  req: Request<IRequest_shopping_command_discount_files_put>,
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
  } else if (user.role === Roles.admin) {
    next();
  } else if (user.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      next(new CustomError("There is no command found to edit", 404));
    } else if (!command.user.equals(user._id) || command.status.confirmed) {
      next(
        new CustomError(
          "You don't have the permission to upload discount files for this command",
          401
        )
      );
    } else {
      next();
    }
  }
}

export async function shopping_command_delete_permission(
  req: Request<IRequest_shopping_command_delete>,
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
  } else if (user.role === Roles.admin) {
    next();
  } else if (user.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      next(new CustomError("There is no command found to delete", 404));
    } else if (!command.user.equals(user._id) || command.status.confirmed) {
      next(
        new CustomError(
          "You don't have the permission to delete this command",
          401
        )
      );
    } else {
      next();
    }
  }
}

export async function shopping_command_discount_file_delete_permission(
  req: Request<IRequest_shopping_command_discount_file_delete>,
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
  } else if (user.role === Roles.admin) {
    next();
  } else if (user.role === Roles.subscriber) {
    const command: ICommand | null = await CommandModel.findById(
      req.params.idCommand
    );
    if (!command) {
      next(
        new CustomError(
          "There is no command found to delete a discount file",
          404
        )
      );
    } else if (!command.user.equals(user._id) || command.status.confirmed) {
      next(
        new CustomError(
          "You don't have the permission to delete this command discount file",
          401
        )
      );
    } else {
      next();
    }
  }
}
