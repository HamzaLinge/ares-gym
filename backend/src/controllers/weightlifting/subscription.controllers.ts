import { NextFunction, Request, Response } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

import {
  IRequest_weightlifting_subscription_admin_get,
  IRequest_weightlifting_subscription_admin_put,
  IRequest_weightlifting_subscription_delete,
  IRequest_weightlifting_subscription_get,
  IRequest_weightlifting_subscription_post,
  IRequest_weightlifting_subscription_subscriber_get,
  IRequest_weightlifting_subscription_subscriber_put,
  IResponse_weightlifting_subscription_admin_get,
  IResponse_weightlifting_subscription_admin_put,
  IResponse_weightlifting_subscription_get,
  IResponse_weightlifting_subscription_post,
  IResponse_weightlifting_subscription_subscriber_get,
  IResponse_weightlifting_subscription_subscriber_put,
  IRResponse_weightlifting_subscription_delete,
} from "../../types/weightlifting/subscription.types";
import SubscriptionModel, { ISubscription } from "../../models/Subscription";
import { CustomError, Roles } from "../../types/common.types";
import { IWeightliftingPlan } from "../../models/WeightliftingPlan";
import { IDiscount } from "../../models/Discount";
import { deleteFile } from "../../utils/deleteFile";

/**
  POST
 */
export async function weightlifting_subscription_post_controller(
  req: Request<any, any, IRequest_weightlifting_subscription_post>,
  res: Response<IResponse_weightlifting_subscription_post>,
  next: NextFunction
) {
  // Even the req.user is already checked in permission handler, we need to check it again to guarantee the good work of typescript, fuck !!
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be created because user cannot be found",
        403
      )
    );
  } else {
    // Prepare the input new subscription
    const inputSubscription: any = { ...req.body };
    if (!inputSubscription.user) inputSubscription.user = req.user._id;
    // Get the user's subscriptions
    const existingSubscriptions: ISubscription[] = await SubscriptionModel.find(
      {
        user: inputSubscription.user,
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
    // Check if there is a file uploaded for discount
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

/**
 GET
 */
export async function weightlifting_subscription_get_subscriber_controller(
  req: Request<
    any,
    any,
    any,
    IRequest_weightlifting_subscription_subscriber_get
  >,
  res: Response<IResponse_weightlifting_subscription_subscriber_get>,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be modified because user cannot be found",
        403
      )
    );
  } else {
    const findFilter: any = {};
    if (req.query?.idSubscription) findFilter._id = req.query.idSubscription;
    if (req.query?.validatedDiscount)
      findFilter.discount.validated = req.query.validatedDiscount;
    if (req.query?.confirmedSubscription)
      findFilter.status.confirmed = req.query.confirmedSubscription;
    if (findFilter._id) {
      const subscription: ISubscription | null =
        await SubscriptionModel.findOne(findFilter)
          .populate<{ weightliftingPlan: IWeightliftingPlan }>({
            path: "weightliftingPlan",
          })
          .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
      if (!subscription) {
        next(new CustomError("There is no subscription found for you", 404));
      } else {
        res.status(200).send({ subscription });
      }
    } else {
      const subscriptions: ISubscription[] = await SubscriptionModel.find(
        findFilter
      )
        .populate<{ weightliftingPlan: IWeightliftingPlan }>({
          path: "weightliftingPlan",
        })
        .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
      if (subscriptions.length === 0) {
        next(new CustomError("There are no subscriptions found for you", 404));
      } else {
        res.status(200).send({ subscriptions });
      }
    }
  }
}

export async function weightlifting_subscription_get_admin_controller(
  req: Request<any, any, any, IRequest_weightlifting_subscription_admin_get>,
  res: Response<IResponse_weightlifting_subscription_admin_get>,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be modified because user cannot be found",
        403
      )
    );
  } else {
    const findFilter: any = {};
    if (req.query?.idUser) findFilter.user = req.query.idUser;
    if (req.query?.idSubscription) findFilter._id = req.query.idSubscription;
    if (req.query?.validatedDiscount)
      findFilter.discount.validated = req.query.validatedDiscount;
    if (req.query?.confirmedSubscription)
      findFilter.status.confirmed = req.query.confirmedSubscription;
    if (findFilter._id) {
      const subscription: ISubscription | null =
        await SubscriptionModel.findOne(findFilter)
          .populate<{ weightliftingPlan: IWeightliftingPlan }>({
            path: "weightliftingPlan",
          })
          .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
      if (!subscription) {
        next(
          new CustomError(
            "There is no subscription found for this Id Subscription",
            404
          )
        );
      } else {
        res.status(200).send({ subscription });
      }
    } else {
      const subscriptions: ISubscription[] = await SubscriptionModel.find(
        findFilter
      )
        .populate<{ weightliftingPlan: IWeightliftingPlan }>({
          path: "weightliftingPlan",
        })
        .populate<{ "discount.data": IDiscount }>({ path: "discount.data" });
      if (subscriptions.length === 0) {
        next(new CustomError("There are no subscriptions found", 404));
      } else {
        res.status(200).send({ subscriptions });
      }
    }
  }
}

/**
 PUT
 */
export async function weightlifting_subscription_put_subscriber_controller(
  req: Request<any, any, IRequest_weightlifting_subscription_subscriber_put>,
  res: Response<IResponse_weightlifting_subscription_subscriber_put>,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be modified because user cannot be found",
        403
      )
    );
  } else {
    const subscriptionInput: any = { ...req.body };
    subscriptionInput.idSubscription && delete subscriptionInput.idSubscription;
    if (req.fileId) {
      subscriptionInput.discount.file = req.fileId;
      SubscriptionModel.findById(req.body.idSubscription).then(
        (oldSubscription: ISubscription | null) => {
          if (oldSubscription?.discount?.file) {
            deleteFile(oldSubscription.discount.file, "Subscription");
          }
        }
      );
    }
    const updatedSubscription: ISubscription | null =
      await SubscriptionModel.findOneAndUpdate(
        { _id: req.body.idSubscription },
        subscriptionInput,
        { new: true }
      );
    if (!updatedSubscription) {
      next(
        new CustomError("Updated subscription not found for some reason", 404)
      );
    } else {
      res.status(200).send({ updatedSubscription });
    }
  }
}

export async function weightlifting_subscription_put_admin_controller(
  req: Request<any, any, IRequest_weightlifting_subscription_admin_put>,
  res: Response<IResponse_weightlifting_subscription_admin_put>,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be modified because user cannot be found",
        403
      )
    );
  } else {
    const subscriptionInput: any = { ...req.body };
    subscriptionInput.idSubscription && delete subscriptionInput.idSubscription;
    subscriptionInput.idUser && delete subscriptionInput.idUser;
    if (req.fileId) {
      subscriptionInput.discount.file = req.fileId;
      SubscriptionModel.findById(req.body.idSubscription).then(
        (oldSubscription: ISubscription | null) => {
          if (oldSubscription?.discount?.file) {
            deleteFile(oldSubscription.discount.file, "Subscription");
          }
        }
      );
    }
    const updatedSubscription: ISubscription | null =
      await SubscriptionModel.findOneAndUpdate(
        { _id: req.body.idSubscription },
        subscriptionInput,
        { new: true }
      );
    if (!updatedSubscription) {
      next(
        new CustomError("Updated subscription not found for some reason", 404)
      );
    } else {
      res.status(200).send({ updatedSubscription });
    }
  }
}

/**
 DELETE
 */
export async function weightlifting_subscription_delete_controller(
  req: Request<IRequest_weightlifting_subscription_delete>,
  res: Response<IRResponse_weightlifting_subscription_delete>,
  next: NextFunction
) {
  if (!req.user) {
    next(
      new CustomError(
        "Subscription cannot be modified because user cannot be found",
        403
      )
    );
  } else {
    await SubscriptionModel.findOneAndDelete({
      _id: req.params.idSubscription,
    });
    res.status(200).send({ message: "Subscription successfully deleted" });
  }
}
