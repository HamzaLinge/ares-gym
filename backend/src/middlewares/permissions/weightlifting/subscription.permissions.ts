import { NextFunction, Request, Response } from "express";

import { CustomError, Roles } from "../../../types/common.types";
import {
  IRequest_weightlifting_subscription_admin_get,
  IRequest_weightlifting_subscription_delete,
  IRequest_weightlifting_subscription_post,
  IRequest_weightlifting_subscription_subscriber_get,
  IRequest_weightlifting_subscription_subscriber_put,
} from "../../../types/weightlifting/subscription.types";
import SubscriptionModel, { ISubscription } from "../../../models/Subscription";

export async function weightlifting_subscription_post_permission(
  req: Request<any, any, IRequest_weightlifting_subscription_post>,
  res: Response,
  next: NextFunction
) {
  if (!req.user)
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  else {
    next();
  }
}

export async function weightlifting_subscription_get_subscriber_permission(
  req: Request<
    any,
    any,
    any,
    IRequest_weightlifting_subscription_subscriber_get
  >,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  } else if (req.user.role === Roles.admin) {
    next(new CustomError("Please user the Admin API to a subscription", 403));
  } else if (req.user.role === Roles.subscriber) {
    if (req.query.idSubscription) {
      const subscription: ISubscription | null =
        await SubscriptionModel.findOne({
          _id: req.query.idSubscription,
          user: req.user._id,
        });
      if (!subscription) {
        next(
          new CustomError("You are not allowed to get this subscription", 401)
        );
      } else {
        next();
      }
    } else {
      next();
    }
  }
}

export async function weightlifting_subscription_get_admin_permission(
  req: Request<any, any, any, IRequest_weightlifting_subscription_admin_get>,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  } else if (req.user.role !== Roles.admin) {
    next(new CustomError("You are not allowed to get subscriptions", 401));
  } else {
    next();
  }
}

export async function weightlifting_subscription_put_subscriber_permission(
  req: Request<any, any, IRequest_weightlifting_subscription_subscriber_put>,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  } else if (req.user.role === Roles.admin) {
    next(new CustomError("Use the API admin to edit subscription", 403));
  } else if (req.user.role === Roles.subscriber) {
    const ownSubscription: ISubscription | null =
      await SubscriptionModel.findOne({
        _id: req.body.idSubscription,
        user: req.user._id,
      });
    if (!ownSubscription) {
      next(
        new CustomError("You are not allowed to edit this subscription", 401)
      );
    } else {
      next();
    }
  }
}

export async function weightlifting_subscription_put_admin_permission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  } else if (req.user.role === Roles.subscriber) {
    next(
      new CustomError(
        "You do not have the permission to edit a subscription",
        401
      )
    );
  } else {
    next();
  }
}

export async function weightlifting_subscription_delete_permission(
  req: Request<IRequest_weightlifting_subscription_delete>,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "There is no user found to check the permission for this request",
        403
      )
    );
  } else if (req.user.role === Roles.admin) {
    next();
  } else if (req.user.role === Roles.subscriber) {
    const subscription: ISubscription | null = await SubscriptionModel.findOne({
      _id: req.params.idSubscription,
      user: req.user._id,
    });
    if (!subscription) {
      next(
        new CustomError(
          "You do not have the permission to delete this subscription",
          401
        )
      );
    } else {
      next();
    }
  }
}
