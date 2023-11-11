import { Document, Model, Schema, model } from "mongoose";

export interface IWeightliftingAsset extends Document {
  title: string;
  icon?: string;
}

type TWeightliftingAssetModel = Model<IWeightliftingAsset>;

const weightliftingAssetSchema = new Schema<
  IWeightliftingAsset,
  TWeightliftingAssetModel
>(
  {
    title: { type: String, required: true, unique: true },
    icon: { type: String, required: false },
  },
  { timestamps: true }
);

const WeightliftingAssetModel = model<
  IWeightliftingAsset,
  TWeightliftingAssetModel
>("weightliftingAssets", weightliftingAssetSchema);

export default WeightliftingAssetModel;
