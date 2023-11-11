import { Request, Response } from "express";

import WeightliftingPlanModel, {
  IWeightliftingPlan,
} from "../../models/WeightliftingPlan";
import SubscriptionModel, { ISubscription } from "../../models/Subscription";
import { addMonthsToDate } from "../../utils/dateHelper";
import {
  IRequest_weightlifting_subscription_create,
  IResponse_weightlifting_subscription_create,
} from "../../types/weightlifting/subscription.types";

export async function weightlifting_subscription_controller_create(
  req: Request<any, any, IRequest_weightlifting_subscription_create>,
  res: Response<IResponse_weightlifting_subscription_create>
): Promise<Response<IResponse_weightlifting_subscription_create>> {
  try {
    const weightliftingPlan: IWeightliftingPlan =
      await WeightliftingPlanModel.findById({
        _id: req.body.idWeightliftingPlan,
      }).select("title");
    if (!weightliftingPlan)
      return res.status(404).send({
        success: true,
        message:
          "There is no weightlifting plan associated with idWeightliftingPlan",
      });
    const subscriptions: ISubscription[] = await SubscriptionModel.find({
      idUser: req.body.idUser,
    }).select("monthNumber dateBegin");
    for (const subscription of subscriptions) {
      const dateEnd = addMonthsToDate(
        subscription.dateBegin,
        subscription.monthNumber
      );
      if (new Date(req.body.dateBegin) < dateEnd) {
        return res.status(400).send({
          success: false,
          message: "You are already subscribed for this period of time",
        });
      }
    }
    await SubscriptionModel.create({
      ...req.body,
      status: { confirmed: false },
    });
    return res.status(200).send({
      success: true,
      message: `Bravo, you successfully subscribed to ${weightliftingPlan.title} plan`,
    });
  } catch (errorSubscribeToWeightliftingPlan) {
    console.log(
      `Internal server error => ${errorSubscribeToWeightliftingPlan}`
    );
    return res.status(500).send({
      success: false,
      message: `Internal server error => ${errorSubscribeToWeightliftingPlan}`,
    });
  }
}

export async function weightlifting_subscription_controller_cancel(
  req: Request,
  res: Response
) {
  try {
  } catch (errorDeleteSubscription) {
    console.log(`Internal server error => ${errorDeleteSubscription}`);
    return res.status(500).send({
      success: false,
      message: `Internal server error => ${errorDeleteSubscription}`,
    });
  }
}
