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

export enum CommandStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export interface ICommand extends Document {
  user: PopulatedDoc<Document<Types.ObjectId> & IUser>;
  supplements: SupplementObject[];
  discount?: PopulatedDoc<Document<Types.ObjectId> & IDiscount>;
  status: CommandStatus;
  shippedAddress?: string;
  dateShipped?: Date;
  dateDelivered?: Date;
  trackingNumber?: string;
  note?: string;
  canceled?: { date: Date; reason?: string };
  createdAt: Date;
  updatedAt: Date;
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
      type: String,
      enum: Object.values(CommandStatus),
      default: CommandStatus.PENDING,
      required: true,
    },
    shippedAddress: { type: String },
    dateShipped: { type: Date },
    dateDelivered: { type: Date },
    trackingNumber: { type: String },
    note: { type: String },
    canceled: {
      type: { date: { type: Date, required: true }, reason: { type: String } },
    },
  },
  { timestamps: true },
);

commandSchema.pre<ICommand>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    if (this.note) {
      this.note = this.note.toLowerCase();
    }
    next();
  },
);

const CommandModel = model<ICommand, TCommand>("commands", commandSchema);

export default CommandModel;
