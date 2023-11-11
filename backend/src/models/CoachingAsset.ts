import { Schema, models, model } from "mongoose";

interface ICoachingAsset {
  title: string;
  icon: string;
}

const coachingAssetSchema = new Schema<ICoachingAsset>(
  {
    title: { type: String, required: true },
    icon: { type: String, required: false },
  },
  { timestamps: true }
);

export default models.CoachingAssets ||
  model<ICoachingAsset>("CoachingAssets", coachingAssetSchema);
