import {
  CallbackError,
  Document,
  model,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";

import { ICommand } from "./Command";

// Enum for Payment Method to ensure consistency
export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  EDAHABIA_CARD = "EDAHABIA_CARD", // Using Chargily for processing
}

export const DELIVERY_PRICE = 600;

// Enum for Payment Status
export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface IPayment extends Document {
  command: PopulatedDoc<Document<Types.ObjectId> & ICommand>;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string; // This can be provided by Chargily for Edahabia payments
  amount: number;
  date: Date; // The date the payment was processed
  additionalInfo?: any; // For any extra information, specific to the payment method used
  createdAt: Date;
  updatedAt: Date;
}

type TPayment = Model<IPayment>;

const paymentSchema = new Schema<IPayment, TPayment>(
  {
    command: { type: Schema.Types.ObjectId, ref: "commands", required: true },
    method: {
      type: String,
      enum: Object.values(PaymentMethod),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
      default: PaymentStatus.PENDING,
    },
    transactionId: { type: String }, // Optional, as it might not be available for COD
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    additionalInfo: { type: Schema.Types.Mixed }, // Flexible field for any method-specific data
  },
  { timestamps: true },
);

// Add DELIVERY_PRICE to `amount` when cash on delivery is chosen
paymentSchema.pre<IPayment>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    if (this.method === PaymentMethod.CASH_ON_DELIVERY) {
      this.amount = this.amount + DELIVERY_PRICE;
    }
    next();
  },
);

const PaymentModel = model<IPayment, TPayment>("payments", paymentSchema);

export default PaymentModel;
