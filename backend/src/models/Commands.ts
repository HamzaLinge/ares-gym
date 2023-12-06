import {
  Document,
  model,
  Model,
  models,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";

import { IUser } from "./User";
import { IDiscount } from "./Discount";
import { ProteinProperty } from "../types/common.types";

export interface ICommand extends Document {
  user: PopulatedDoc<Document<Types.ObjectId> & IUser>;
  protein: ProteinProperty[];
  discount?: {
    data: PopulatedDoc<Document<Types.ObjectId> & IDiscount>;
    file?: string;
    validated: boolean;
  };
  datePayment?: Date;
  note?: string;
}

type TCommand = Model<ICommand>;

const commandSchema = new Schema<ICommand, TCommand>(
  {
    user: { type: Schema.Types.ObjectId, ref: "users", required: true },
    protein: {
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
      type: {
        data: { type: Types.ObjectId, required: true },
        file: { type: String, required: false },
        validated: { type: Boolean, required: true, default: false },
      },
      required: false,
    },
    datePayment: { type: Date, required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

const CommandModel =
  models.commands || model<ICommand, TCommand>("commands", commandSchema);

export default CommandModel;
