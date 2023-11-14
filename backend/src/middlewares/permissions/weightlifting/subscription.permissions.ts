import { NextFunction, Request, Response } from "express";
import { CustomError, Roles } from "../../../types/common.types";
import { IRequest_weightlifting_subscription_post } from "../../../types/weightlifting/subscription.types";

export async function weightlifting_subscription_post_permission(
  req: Request<any, any, IRequest_weightlifting_subscription_post>,
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
  else {
    if (user._id.toString() !== req.body.user && user.role !== Roles.admin) {
      next(
        new CustomError(
          "You do not have the permission to create a subscription",
          401
        )
      );
    } else {
      next();
    }
  }
}
