import {
  CallbackError,
  Document,
  model,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
  parent?: PopulatedDoc<Document<Types.ObjectId> & ICategory>;
}

type TCategory = Model<ICategory>;

const categorySchema = new Schema<ICategory, TCategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    parent: { type: Schema.Types.ObjectId, ref: "categories", required: false },
  },
  { timestamps: true }
);

categorySchema.pre<ICategory>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    this.name = this.name.toLowerCase();
    if (this.description) this.description = this.description.toLowerCase();
    next();
  }
);

const CategoryModel = model<ICategory, TCategory>("categories", categorySchema);

export default CategoryModel;
