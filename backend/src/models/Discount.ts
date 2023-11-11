import { Schema, models, model } from "mongoose";

type TargetDiscount = "Weightlifting" | "Coaching" | "Shopping";

interface IDiscount {
  title: string;
  percentage: number;
  targets: TargetDiscount[];
  expiry: Date;
  description: string;
}

const discountSchema = new Schema<IDiscount>(
  {
    title: { type: String, required: true },
    percentage: { type: number, required: true },
    targets: {
      type: [String],
      enum: ["Weightlifting", "Coaching", "Shopping"],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Discounts ||
  model<IDiscount>("Discounts", discountSchema);
