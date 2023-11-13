import { TGenderWeightliftingPlan } from "../common.types";
import { IWeightliftingPlan } from "../../models/WeightliftingPlan";

/**
 /weightlifting/plan/post route
 */
export interface IRequest_weightlifting_plan_post {
  title: string;
  price: number;
  gender: TGenderWeightliftingPlan;
  sessionsPerWeek: number;
  assets: string[];
}
export interface IResponse_weightlifting_plan_post {
  weightliftingPlan: IWeightliftingPlan;
}

/**
 /weightlifting/plan/get route
 */
export interface IRequest_weightlifting_plan_get {
  idWeightliftingPlan?: string;
}
interface IResponse_weightlifting_plan_getOne {
  weightliftingPlan: IWeightliftingPlan;
}
interface IResponse_weightlifting_plan_getAll {
  weightliftingPlans: IWeightliftingPlan[];
}
export type TResponse_weightlifting_plan_get =
  | IResponse_weightlifting_plan_getOne
  | IResponse_weightlifting_plan_getAll;

/**
 /weightlifting/plan/put route
 */
export interface IRequest_weightlifting_plan_put {
  idWeightliftingPlan: string;
  title?: string;
  price?: number;
  gender?: TGenderWeightliftingPlan;
  sessionsPerWeek?: number;
  assets?: string[];
}
export interface IResponse_weightlifting_plan_put {
  updatedWeightliftingPlan: IWeightliftingPlan;
}

/**
 /weightlifting/plan/delete route
 */
export interface IRequest_weightlifting_plan_delete {
  idWeightliftingPlan?: string;
}
export interface IResponse_weightlifting_plan_delete {
  message: string;
}
