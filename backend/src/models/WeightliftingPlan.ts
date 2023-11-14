import { Model, Schema, Types, model, Document, PopulatedDoc } from "mongoose";
import {
  GendersWeightliftingPlan,
  TGenderWeightliftingPlan,
} from "../types/common.types";

import { IWeightliftingAsset } from "./WeightliftingAsset";

export interface IWeightliftingPlan extends Document {
  title: string;
  price: number;
  gender: TGenderWeightliftingPlan;
  sessionsPerWeek: number;
  assets: PopulatedDoc<Document<Types.ObjectId[]> & IWeightliftingAsset[]>;
}

type TWeightliftingPlanModel = Model<IWeightliftingPlan>;

const weightliftingPlanSchema = new Schema<
  IWeightliftingPlan,
  TWeightliftingPlanModel
>(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true }, // Unit: DA (Algerian Dinars)
    gender: {
      type: String,
      enum: Object.values(GendersWeightliftingPlan),
      required: true,
    },
    sessionsPerWeek: { type: Number, required: true },
    assets: {
      type: [{ type: Schema.Types.ObjectId, ref: "weightliftingAssets" }],
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
