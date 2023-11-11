import { Model, Schema, Types, model, Document } from "mongoose";
import {
  GendersWeightliftingPlan,
  TGenderWeightliftingPlan,
} from "../types/common.types";

export interface IWeightliftingPlan extends Document {
  title: string;
  price: string;
  gender: TGenderWeightliftingPlan;
  sessionsPerWeek: number;
  assets: Types.ObjectId[];
}

type TWeightliftingPlanModel = Model<IWeightliftingPlan>;

const weightliftingPlanSchema = new Schema<
  IWeightliftingPlan,
  TWeightliftingPlanModel
>(
  {
    title: { type: String, required: true },
    price: { type: String, required: true }, // Unit: DA (Algerian Dinars)
    gender: {
      type: String,
      enum: Object.values(GendersWeightliftingPlan),
      required: true,
    },
    sessionsPerWeek: { type: Number, required: true },
    assets: {
      type: [{ type: Schema.Types.ObjectId, ref: "WeightliftingAssets" }],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const WeightliftingPlanModel = model<
  IWeightliftingPlan,
  TWeightliftingPlanModel
>("weightliftingPlans", weightliftingPlanSchema);

export default WeightliftingPlanModel;
