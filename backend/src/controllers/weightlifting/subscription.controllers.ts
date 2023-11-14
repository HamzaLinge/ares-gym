import { NextFunction, Request, Response } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

import {
  IRequest_weightlifting_subscription_post,
  IResponse_weightlifting_subscription_post,
} from "../../types/weightlifting/subscription.types";
import SubscriptionModel, { ISubscription } from "../../models/Subscription";
import { CustomError } from "../../types/common.types";
import { IWeightliftingPlan } from "../../models/WeightliftingPlan";
import { IDiscount } from "../../models/Discount";

export async function weightlifting_subscription_post_controller(
  req: Request<any, any, IRequest_weightlifting_subscription_post>,
  res: Response<IResponse_weightlifting_subscription_post>,
  next: NextFunction
) {
  // Even the req.user is already checked in permission handler, we need to check it again to guarantee the good work of typescript
  if (!req.user) {
    next(new CustomError("'user' is required in Request", 404));
  } else {
    // Get the user's subscriptions
    const existingSubscriptions: ISubscription[] = await SubscriptionModel.find(
      {
        user: req.user._id,
      }
    ).populate<{ weightliftingPan: IWeightliftingPlan }>({
      path: "weightliftingPlan",
    });
    // Check if there is an overlap between new subscription's time and the existed subscription's time
    if (existingSubscriptions.length > 0) {
      const newDateBegin = new Date(req.body.dateBegin);
      const newDateEnd = new Date(
        newDateBegin.setMonth(newDateBegin.getMonth() + req.body.monthNumber)
      );
      for (const subscription of existingSubscriptions) {
        const dateBegin = new Date(subscription.dateBegin);
        const dateEnd = new Date(
          dateBegin.setMonth(dateBegin.getMonth() + subscription.monthNumber)
        );
        if (
          (newDateBegin < dateBegin && newDateEnd > dateBegin) ||
          (newDateBegin >= dateBegin && newDateBegin < dateEnd)
        ) {
          next(
            new CustomError(
              `An overlap has found with another subscription for ${
                subscription.weightliftingPlan &&
                "title" in subscription.weightliftingPlan
                  ? subscription.weightliftingPlan.title
                  : "a"
              } weightlifting plan`,
              409
            )
          );
          break;
        }
      }
    }
    // Prepare the input new subscription
    const inputSubscription = req.body as ISubscription;
    if (!inputSubscription.user) {
      // Admin case
      inputSubscription.user = req.user._id;
    }
    if (req.fileId) {
      if (!inputSubscription.discount) {
        const gridFSBucket = new GridFSBucket(mongoose.connection.db);
        gridFSBucket
          .delete(new mongoose.Types.ObjectId(req.fileId))
          .catch((deleteErr) => {
            console.error("Error deleting file from GridFS:", deleteErr);
          });
      } else {
        inputSubscription.discount.file = req.fileId;
      }
    }
    // Create a new subscription and return it
    const createdSubscription: ISubscription = await SubscriptionModel.create(
      inputSubscription
    );
    const newSubscription: ISubscription | null =
      await SubscriptionModel.findById(createdSubscription._id)
        .populate<{ weightliftingPan: IWeightliftingPlan }>({
          path: "weightliftingPlan",
        })
        .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
    if (!newSubscription) {
      next(new CustomError("Created subscription not found", 404));
    } else {
      res.status(200).send({ subscription: newSubscription });
    }
  }
}
