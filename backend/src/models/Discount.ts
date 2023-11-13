import { Document, Schema, Model, model, Types } from "mongoose";

import { TargetsDiscount, TTargetDiscount } from "../types/common.types";

export interface IDiscount extends Document {
  title: string;
  percentage: number;
  targets: TTargetDiscount[];
  dateBegin: Date;
  dateEnd: Date;
  description: string;
  thumbnail?: string;
}

type TDiscountModel = Model<IDiscount>;

const discountSchema = new Schema<IDiscount, TDiscountModel>(
  {
    title: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true },
    targets: {
      type: [String],
      enum: Object.values(TargetsDiscount),
      required: true,
    },
    dateBegin: { type: Date, required: true, default: Date.now },
    dateEnd: {
      type: Date,
      required: true,
      set: (v: string) => {
        const date = new Date(v);
        return new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59,
          59
        );
      },
    },
    description: { type: String, required: true },
    thumbnail: { type: String, required: false },
  },
  { timestamps: true }
);

const DiscountModel = model<IDiscount, TDiscountModel>(
  "discounts",
  discountSchema
);

export default DiscountModel;
