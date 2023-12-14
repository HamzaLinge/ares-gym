import {
  CallbackError,
  Document,
  model,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";

import { ICategory } from "./Category";

export interface ISupplement extends Document {
  name: string;
  category: PopulatedDoc<Document<Types.ObjectId> & ICategory>;
  // manufacturer?: string;
  // nutritionalFacts?: {
  //   calories: number;
  //   protein: number;
  //   carbohydrates: number;
  //   fats: number;
  //   vitamins: number;
  //   minerals: number;
  // };
  // recommendedUse?: string;
  // ingredients?: string[];
  // certifications: [string];
  // flavors?: [string];
  // variants?: [string];
  // targetAudience?: string;
  // allergenInfo?: string;
  // performanceClaims?: string;
  // testimonials?: [string];
  price: number;
  stock: number;
  thumbnails?: string[];
  description?: string;
}

type TSupplement = Model<ISupplement>;

const supplementSchema = new Schema<ISupplement, TSupplement>(
  {
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    thumbnails: { type: [String], required: true, default: [] },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

supplementSchema.pre<ISupplement>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    this.name = this.name.toLowerCase();
    if (this.description) this.description = this.description.toLowerCase();
    next();
  }
);

const SupplementModel = model<ISupplement, TSupplement>(
  "supplements",
  supplementSchema
);

export default SupplementModel;
