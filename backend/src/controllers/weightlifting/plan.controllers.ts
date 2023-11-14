import { NextFunction, Request, Response } from "express";

import WeightliftingPlan from "../../models/WeightliftingPlan";
import WeightliftingPlanModel from "../../models/WeightliftingPlan";
import weightliftingPlan, {
  IWeightliftingPlan,
} from "../../models/WeightliftingPlan";
import { CustomError } from "../../types/common.types";
import {
  IRequest_weightlifting_plan_delete,
  IRequest_weightlifting_plan_get,
  IRequest_weightlifting_plan_post,
  IRequest_weightlifting_plan_put,
  IResponse_weightlifting_plan_delete,
  IResponse_weightlifting_plan_post,
  IResponse_weightlifting_plan_put,
  TResponse_weightlifting_plan_get,
} from "../../types/weightlifting/plan.types";
import SubscriptionModel, { ISubscription } from "../../models/Subscription";

export async function weightlifting_plan_post_controller(
  req: Request<any, any, IRequest_weightlifting_plan_post>,
  res: Response<IResponse_weightlifting_plan_post>,
  next: NextFunction
) {
  const sameTitleWeightliftingPlan: IWeightliftingPlan | null =
    await WeightliftingPlan.findOne({
      title: req.body.title,
    });
  if (sameTitleWeightliftingPlan) {
    next(
      new CustomError("This title weightlifting plan is already taken", 409)
    );
  } else {
    await WeightliftingPlan.create({
      ...req.body,
    });
    const weightliftingPlan: IWeightliftingPlan | null =
      await WeightliftingPlanModel.findOne({ title: req.body.title }).populate({
        path: "assets",
      });
    if (!weightliftingPlan) {
      next(
        new CustomError(
          `The new weightlifting plan: ${req.body.title}, didn't find`,
          404
        )
      );
    } else {
      res.status(200).send({ weightliftingPlan });
    }
  }
}

export async function weightlifting_plan_get_controller(
  req: Request<any, any, any, IRequest_weightlifting_plan_get>,
  res: Response<TResponse_weightlifting_plan_get>,
  next: NextFunction
) {
  if (req.query.idWeightliftingPlan) {
    const weightliftingPlan: IWeightliftingPlan | null =
      await WeightliftingPlanModel.findById(
        req.query.idWeightliftingPlan
      ).populate({ path: "assets" });
    if (!weightliftingPlan) {
      next(new CustomError("There is no weightlifting plan for this id", 404));
    } else {
      res.status(200).send({ weightliftingPlan });
    }
  } else {
    const weightliftingPlans: IWeightliftingPlan[] =
      await WeightliftingPlanModel.find().populate({ path: "assets" });
    if (weightliftingPlan.length === 0) {
      next(new CustomError("There are no weightlifting plans found", 404));
    } else {
      res.status(200).send({ weightliftingPlans });
    }
  }
}

export async function weightlifting_plan_put_controller(
  req: Request<any, any, IRequest_weightlifting_plan_put>,
  res: Response<IResponse_weightlifting_plan_put>,
  next: NextFunction
) {
  const exists: IWeightliftingPlan | null =
    await WeightliftingPlanModel.findById(req.body.idWeightliftingPlan);
  if (!exists) {
    next(
      new CustomError(
        "There is no weightlifting plan found for this id to edit",
        404
      )
    );
  } else {
    const inputWeightliftingPlan: any = { ...req.body };
    delete inputWeightliftingPlan["idWeightliftingPlan"];
    const updatedWeightliftingPlan: IWeightliftingPlan | null =
      await WeightliftingPlanModel.findOneAndUpdate(
        {
          _id: req.body.idWeightliftingPlan,
        },
        { ...inputWeightliftingPlan },
        { new: true }
      ).populate({ path: "assets" });
    if (!updatedWeightliftingPlan) {
      next(
        new CustomError(
          "There is no updated weightlifting plan updated found for this id",
          404
        )
      );
    } else {
      res.status(200).send({ updatedWeightliftingPlan });
    }
  }
}

export async function weightlifting_plan_delete_controller(
  req: Request<IRequest_weightlifting_plan_delete>,
  res: Response<IResponse_weightlifting_plan_delete>,
  next: NextFunction
) {
  const exists: IWeightliftingPlan | null =
    await WeightliftingPlanModel.findById(req.params.idWeightliftingPlan);
  if (!exists) {
    next(
      new CustomError(
        "There is no weightlifting plan found for this id to delete",
        404
      )
    );
  } else {
    const subscriptions: ISubscription[] = await SubscriptionModel.find({
      weightliftingPlan: req.params.idWeightliftingPlan,
    });
    if (subscriptions.length > 0) {
      next(
        new CustomError(
          "There is at least one subscription lied with this weightlifting plan",
          409
        )
      );
    } else {
      await WeightliftingPlanModel.findOneAndDelete({
        _id: req.params.idWeightliftingPlan,
      });
      res.status(200).send({
        message: `The "${exists.title}" weightlifting plan successfully deleted`,
      });
    }
  }
}
