import { Document, model, Model, Schema, Types } from "mongoose";

export interface ISubscription extends Document {
  idUser: Types.ObjectId;
  idWeightliftingPlan: Types.ObjectId;
  dateBegin: Date;
  monthNumber: number;
  discount?: {
    idDiscount: Types.ObjectId;
    scan: string;
  };
  status: {
    confirmed: boolean;
    datePayment?: Date;
  };
}

type TSubscriptionModel = Model<ISubscription>;

const subscriptionSchema = new Schema<ISubscription, TSubscriptionModel>(
  {
    idUser: { type: Schema.Types.ObjectId, ref: "users", required: true },
    idWeightliftingPlan: {
      type: Schema.Types.ObjectId,
      ref: "weightliftingPlans",
      required: true,
    },
    dateBegin: { type: Date, required: true },
    monthNumber: { type: Number, required: true },
    discount: {
      type: {
        idDiscount: {
          type: Schema.Types.ObjectId,
          ref: "discounts",
          required: true,
        },
        scan: { type: String, required: true },
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
