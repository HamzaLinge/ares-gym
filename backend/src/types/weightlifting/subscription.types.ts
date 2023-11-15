import mongoose from "mongoose";
import { ISubscription } from "../../models/Subscription";

/**
 /weightlifting/subscription/post route
 */
export interface IRequest_weightlifting_subscription_post {
  user?: mongoose.Types.ObjectId; // Admin case
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
 /weightlifting/subscription/get route
 */
export interface IRequest_weightlifting_subscription_get {
  idUser?: mongoose.Types.ObjectId;
  idSubscription?: mongoose.Types.ObjectId;
  validatedDiscount?: boolean;
  confirmedSubscription?: boolean;
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

/**
 /weightlifting/subscription/subscriber/get route
 */
export interface IRequest_weightlifting_subscription_subscriber_get {
  idSubscription?: mongoose.Types.ObjectId;
  validatedDiscount?: boolean;
  confirmedSubscription?: boolean;
}
interface IResponse_weightlifting_subscription_subscriber_getOne {
  subscription: ISubscription;
}
interface IResponse_weightlifting_subscription_subscriber_getAll {
  subscriptions: ISubscription[];
}
export type IResponse_weightlifting_subscription_subscriber_get =
  | IResponse_weightlifting_subscription_subscriber_getOne
  | IResponse_weightlifting_subscription_subscriber_getAll;

/**
 /weightlifting/subscription/admin/get route
 */
export interface IRequest_weightlifting_subscription_admin_get {
  idUser?: mongoose.Types.ObjectId;
  idSubscription?: mongoose.Types.ObjectId;
  validatedDiscount?: boolean;
  confirmedSubscription?: boolean;
}
interface IResponse_weightlifting_subscription_admin_getOne {
  subscription: ISubscription;
}
interface IResponse_weightlifting_subscription_admin_getAll {
  subscriptions: ISubscription[];
}
export type IResponse_weightlifting_subscription_admin_get =
  | IResponse_weightlifting_subscription_admin_getOne
  | IResponse_weightlifting_subscription_admin_getAll;

/**
 /weightlifting/subscription/subscriber/put route
 */
export interface IRequest_weightlifting_subscription_subscriber_put {
  idSubscription: mongoose.Types.ObjectId;
  weightliftingPlan?: mongoose.Types.ObjectId;
  dateBegin?: Date;
  monthNumber?: number;
  discount?: {
    data?: mongoose.Types.ObjectId;
  };
}
export interface IResponse_weightlifting_subscription_subscriber_put {
  updatedSubscription: ISubscription;
}

/**
 /weightlifting/subscription/admin/put route
 */
export interface IRequest_weightlifting_subscription_admin_put {
  idSubscription: mongoose.Types.ObjectId;
  idUser: mongoose.Types.ObjectId;
  weightliftingPlan?: mongoose.Types.ObjectId;
  dateBegin?: Date;
  monthNumber?: number;
  discount?: {
    data?: mongoose.Types.ObjectId;
    file?: string;
    validated?: boolean;
  };
  status?: {
    confirmed: boolean;
  };
}
export interface IResponse_weightlifting_subscription_admin_put {
  updatedSubscription: ISubscription;
}

/**
 /weightlifting/subscription/delete route
 */
export interface IRequest_weightlifting_subscription_delete {
  idSubscription?: mongoose.Types.ObjectId;
}
export interface IRResponse_weightlifting_subscription_delete {
  message: string;
}
