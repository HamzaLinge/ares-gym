import { Schema, model, models } from "mongoose";

interface IProtein {
  name: string;
  type: string;
  price: number;
  stock: number;
  pictures: string[];
  description: string;
}

const proteinSchema = new Schema<IProtein>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    pictures: { type: [String], required: true, default: [] },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Proteins || model<IProtein>("Proteins", proteinSchema);
