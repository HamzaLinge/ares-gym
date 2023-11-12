import { TGenderWeightliftingPlan } from "../common.types";

import { IWeightliftingAsset } from "../../models/WeightliftingAsset";
import { IWeightliftingPlan } from "../../models/WeightliftingPlan";

export interface IRequest_weightlifting_plan_post {
  title: string;
  price: number;
  gender: TGenderWeightliftingPlan;
  sessionPerWeek: number;
  assets: string[];
}
export interface IResponse_weightlifting_plan_post {
  weightliftingPlan: IWeightliftingPlan;
}
