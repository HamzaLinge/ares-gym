import { Schema } from "mongoose";
import { IResponse } from "../common.types";

/*
 /weightlifting/subscription/create route
 */
export interface IRequest_weightlifting_subscription_create {
  idUser: Schema.Types.ObjectId;
  idWeightliftingPlan: Schema.Types.ObjectId;
  dateBegin: Date;
  monthNumber: number;
  discount?: {
    idDiscount: Schema.Types.ObjectId;
    scan: string;
  };
}
export interface IResponse_weightlifting_subscription_create extends IResponse {
  message: string;
}

/*
 /weightlifting/subscription/cancel route
 */
export interface IRequest_weightlifting_subscription_cancel {
  idSubscription: string;
}
export interface IResponse_weightlifting_subscription_cancel extends IResponse {
  message: string;
}
