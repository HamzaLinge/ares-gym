import { NextFunction, Request, Response } from "express";

import WeightliftingPlan, {
  IWeightliftingPlan,
} from "../../models/WeightliftingPlan";
import { CustomError } from "../../types/common.types";
import {
  IRequest_weightlifting_plan_post,
  IResponse_weightlifting_plan_post,
} from "../../types/weightlifting/plan.types";
import { IWeightliftingAsset } from "../../models/WeightliftingAsset";

export async function weightlifting_plan_create_controller(
  req: Request<any, any, IRequest_weightlifting_plan_post>,
  res: Response<IResponse_weightlifting_plan_post>,
  next: NextFunction
) {
  const sameTitleWeightliftingPlan: IWeightliftingPlan | null =
    await WeightliftingPlan.findOne({
      title: req.body.title,
    }).populate<{ assets: IWeightliftingAsset[] }>({ path: "assets" });
  if (sameTitleWeightliftingPlan) {
    next(
      new CustomError("This title weightlifting plan is already taken", 409)
    );
  } else {
    const weightliftingPlan: IWeightliftingPlan =
      await WeightliftingPlan.create({
        ...req.body,
      });
    res.status(200).send({ weightliftingPlan });
  }
}

export async function weightlifting_plan_get_controller(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function weightlifting_plan_put_controller(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function weightlifting_plan_delete_controller(
  req: Request,
  res: Response,
  next: NextFunction
) {}
