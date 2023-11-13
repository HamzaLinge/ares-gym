import { Document, model, Model, Schema, Types, PopulatedDoc } from "mongoose";

import { IUser } from "./User";
import { IWeightliftingPlan } from "./WeightliftingPlan";
import { IDiscount } from "./Discount";

export interface ISubscription extends Document {
  user: PopulatedDoc<Document<Types.ObjectId> & IUser>;
  weightliftingPlan: PopulatedDoc<
    Document<Types.ObjectId> & IWeightliftingPlan
  >;
  dateBegin: Date;
  monthNumber: number;
  discount?: {
    data: PopulatedDoc<Document<Types.ObjectId> & IDiscount>;
    file?: string;
    validated: boolean;
  };
  status: {
    confirmed: boolean;
    datePayment?: Date;
  };
}

type TSubscriptionModel = Model<ISubscription>;

const subscriptionSchema = new Schema<ISubscription, TSubscriptionModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    weightliftingPlan: {
      type: Schema.Types.ObjectId,
      ref: "weightliftingPlans",
      required: true,
    },
    dateBegin: { type: Date, required: true },
    monthNumber: { type: Number, required: true },
    discount: {
      type: {
        data: {
          type: Schema.Types.ObjectId,
          ref: "discounts",
          required: true,
        },
        file: { type: String, required: false },
        validated: { type: Boolean, required: true, default: false },
      },
      required: false,
    },
    status: {
      type: {
        confirmed: { type: Boolean, required: true, default: false },
        datePayment: { type: Date, required: false },
      },
      required: true,
    },
  },
  { timestamps: true }
);

const SubscriptionModel = model<ISubscription, TSubscriptionModel>(
  "subscriptions",
  subscriptionSchema
);

export default SubscriptionModel;
