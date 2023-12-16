import { faker } from "@faker-js/faker";

import SupplementModel, { ISupplement } from "../../../models/Supplement";
import CategoryModel, { ICategory } from "../../../models/Category";
import { deleteFile } from "../../../utils/file.util";

export const supplementTestMethods = {
  create: async (): Promise<ISupplement> => {
    try {
      const category = (await CategoryModel.create({
        name: faker.word.noun(),
      })) as ICategory;
      return (await SupplementModel.create({
        name: faker.word.noun(),
        category: category._id,
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1, max: 100 }),
      })) as ISupplement;
    } catch (error) {
      console.error(`Error creating supplement => ${error}`);
      throw new Error("Error creating supplement");
    }
  },
  delete: async (idSupplement: string): Promise<void> => {
    try {
      const deletedSupplement: ISupplement | null =
        await SupplementModel.findOneAndDelete({ _id: idSupplement });
      if (deletedSupplement) {
        await CategoryModel.findOneAndDelete({
          _id: deletedSupplement.category,
        });
        if (deletedSupplement.thumbnails) {
          for (const fileId of deletedSupplement.thumbnails) {
            await deleteFile(fileId);
          }
        }
      }
    } catch (error) {
      console.error(`Error deleting category => ${error}`);
      throw new Error("Error deleting category");
    }
  },
};
