import { Schema, models, model, Types } from "mongoose";

interface ICommand {
  idSubscriber: Types.ObjectId;
  idProtein: Types.ObjectId;
  datePayment?: Date;
  quantity: number;
  discount?: {
    idDiscount: Types.ObjectId;
    scan?: string;
  };
}

const commandSchema = new Schema<ICommand>({
  idSubscriber: { type: Types.ObjectId, ref: "Subscribers", required: true },
  idProtein: { type: Types.ObjectId, ref: "Proteins", required: true },
  datePayment: { type: Date, required: false },
  quantity: { type: Number, required: true },
  discount: {
    type: {
      idDiscount: { type: Types.ObjectId, required: true },
      scan: { type: String, required: false },
    },
    required: false,
  },
});

export default models.Commands || model<ICommand>("Commands", commandSchema);
