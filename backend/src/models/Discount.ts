import { CallbackError, Document, Model, model, Schema } from "mongoose";

// export interface IDiscount extends Document {
//   title: string;
//   type: 'PERCENTAGE' | 'FIXED' | 'BUY_X_GET_Y_FREE';
//   value: number; // Represents percentage for 'PERCENTAGE', fixed amount for 'FIXED', and quantity for 'BUY_X_GET_Y_FREE'
//   dateBegin: Date;
//   dateEnd: Date;
//   applicableProducts?: Types.ObjectId[]; // Optional, references to products to which the discount can be applied
//   minimumOrderValue?: number; // Optional, minimum order value before discount applies
//   description?: string;
//   thumbnail?: string;
// }

export interface IDiscount extends Document {
  title: string;
  percentage: number;
  dateBegin: Date;
  dateEnd: Date;
  description?: string;
  thumbnail?: string;
}

type TDiscountModel = Model<IDiscount>;

const discountSchema = new Schema<IDiscount, TDiscountModel>(
  {
    title: { type: String, required: true },
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
    dateBegin: {
      type: Date,
      required: true,
    },
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
          59,
        );
      },
    },
    description: { type: String, required: false },
    thumbnail: { type: String, required: false },
  },
  { timestamps: true },
);

discountSchema.pre<IDiscount>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    this.title = this.title.toLowerCase();
    if (this.description) this.description = this.description.toLowerCase();
    next();
  },
);

const DiscountModel = model<IDiscount, TDiscountModel>(
  "discounts",
  discountSchema,
);

export default DiscountModel;
