import { Document, model, Model, PopulatedDoc, Schema, Types } from "mongoose";

import { IUser } from "./User";
import { IDiscount } from "./Discount";
import { ProteinObject } from "../types/common.type";

export interface ICommand extends Document {
  user: PopulatedDoc<Document<Types.ObjectId> & IUser>;
  proteins: ProteinObject[];
  discount?: PopulatedDoc<Document<Types.ObjectId> & IDiscount>;
  status: {
    datePayment?: Date;
    confirmed: boolean;
  };
  note?: string;
}

type TCommand = Model<ICommand>;

const commandSchema = new Schema<ICommand, TCommand>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    proteins: {
      type: [
        {
          data: {
            type: Schema.Types.ObjectId,
            ref: "proteins",
            required: true,
          },
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      required: true,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "discounts",
      required: false,
    },
    status: {
      type: {
        datePayment: { type: Date, required: false },
        confirmed: { type: Boolean, required: true, default: false },
      },
      required: true,
    },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

const CommandModel = model<ICommand, TCommand>("commands", commandSchema);

export default CommandModel;
