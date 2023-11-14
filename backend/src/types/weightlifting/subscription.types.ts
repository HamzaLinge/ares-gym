import mongoose from "mongoose";
import { ISubscription } from "../../models/Subscription";

/**
 /weightlifting/subscription/post route
 */
export interface IRequest_weightlifting_subscription_post {
  user?: mongoose.Types.ObjectId;
  weightliftingPlan: mongoose.Types.ObjectId;
  dateBegin: Date;
  monthNumber: number;
  discount?: {
    data: mongoose.Types.ObjectId;
  };
}
export interface IResponse_weightlifting_subscription_post {
  subscription: ISubscription;
}

/**
 /weightlifting/subscription/put route
 */
export interface IRequest_weightlifting_subscription_get {
  idSubscription?: string;
}
interface IResponse_weightlifting_subscription_getOne {
  subscription: ISubscription;
}
interface IResponse_weightlifting_subscription_getAll {
  subscriptions: ISubscription[];
}
export type IResponse_weightlifting_subscription_get =
  | IResponse_weightlifting_subscription_getOne
  | IResponse_weightlifting_subscription_getAll;
