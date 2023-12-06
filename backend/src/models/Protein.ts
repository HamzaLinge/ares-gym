import { Document, Schema, model, Model, models } from "mongoose";

export interface IProtein extends Document {
  name: string;
  type: string;
  price: number;
  stock: number;
  thumbnails: string[];
  description: string;
}

type TProtein = Model<IProtein>;

const proteinSchema = new Schema<IProtein, TProtein>(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    thumbnails: { type: [String], required: false, default: [] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const ProteinModel =
  models.proteins || model<IProtein, TProtein>("proteins", proteinSchema);

export default ProteinModel;
