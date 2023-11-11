import { NextFunction, Request, Response } from "express";

import SubscriptionModel, { ISubscription } from "../../../models/Subscription";
import { Roles } from "../../../types/common.types";
import { IRequest_weightlifting_subscription_cancel } from "../../../types/weightlifting/subscription.types";

export async function weightlifting_subscription_permission_create(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return next();
  } catch (errorPermissionSubscribeToWeightliftingPlan) {
    console.log(
      `Something went wrong during checking permissions for subscribe to weightlifting plan => ${errorPermissionSubscribeToWeightliftingPlan}`
    );
    return res.status(500).send({
      success: false,
      message:
        "Something went wrong during checking permissions for subscribe to weightlifting plan",
    });
  }
}

export async function weightlifting_subscription_permission_cancel(
  req: Request<any, any, IRequest_weightlifting_subscription_cancel>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    if (!user)
      return res.status(404).send({
        success: false,
        message:
          "There is no user found to check the permission for this request",
      });
    const subscription: ISubscription = await SubscriptionModel.findById(
      req.body.idSubscription
    ).select("idUser status");
    if (!subscription)
      return res.status(404).send({
        success: false,
        message:
          "There is no subscription found with this idSubscription to check the permission",
      });
    console.log(subscription._id);
    if (
      user.role === Roles.admin ||
      (user._id.toString() === subscription.idUser &&
        !subscription.status.confirmed)
    )
      return next();
    return res.status(401).send({
      success: false,
      message: "You do not have the permission to cancel a subscription",
    });
  } catch (errorPermissionCancelSubscription) {
    console.log(
      `Something went wrong during checking permissions for cancel subscription => ${errorPermissionCancelSubscription}`
    );
    return res.status(500).send({
      success: false,
      message:
        "Something went wrong during checking permissions for cancel subscription",
    });
  }
}
