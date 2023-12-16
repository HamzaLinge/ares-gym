import {
  CallbackError,
  Document,
  model,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";

import { IUser } from "./User";
import { IDiscount } from "./Discount";
import { SupplementObject } from "../features/command/command.type";

export interface ICommand extends Document {
  user: PopulatedDoc<Document<Types.ObjectId> & IUser>;
  supplements: SupplementObject[];
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
    supplements: {
      type: [
        {
          data: {
            type: Schema.Types.ObjectId,
            ref: "supplements",
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

commandSchema.pre<ICommand>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    if (this.note) {
      this.note = this.note.toLowerCase();
    }
    next();
  }
);

const CommandModel = model<ICommand, TCommand>("commands", commandSchema);

export default CommandModel;
