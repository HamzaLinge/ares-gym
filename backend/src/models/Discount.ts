import { Document, Model, model, Schema } from "mongoose";

export interface IDiscount extends Document {
  title: string;
  percentage: number;
  dateBegin: Date;
  dateEnd: Date;
  description: string;
  thumbnail?: string;
}

type TDiscountModel = Model<IDiscount>;

const discountSchema = new Schema<IDiscount, TDiscountModel>(
  {
    title: { type: String, required: true, unique: true },
    percentage: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => {
          return value >= 0 && value <= 100;
        },
        message: "Percentage must be between 0 and 100",
      },
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
