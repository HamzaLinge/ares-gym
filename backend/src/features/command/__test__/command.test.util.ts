import { faker } from "@faker-js/faker";

import CommandModel, { ICommand } from "../../../models/Command";
import CategoryModel, { ICategory } from "../../../models/Category";
import SupplementModel, { ISupplement } from "../../../models/Supplement";

export const commandTestMethods = {
  create: async (
    userId: string,
    nbrSupplements: number = 2
  ): Promise<ICommand> => {
    try {
      const category = (await CategoryModel.create({
        name: faker.word.noun(),
      })) as ICategory;
      const supplements: ISupplement[] = [];
      for (let i = 0; i < nbrSupplements; i++) {
        supplements.push(
          (await SupplementModel.create({
            name: faker.word.noun(),
            category: category._id,
            price: faker.commerce.price(),
            stock: faker.number.int({ min: 1, max: 100 }),
          })) as ISupplement
        );
      }
      return (await CommandModel.create({
        user: userId,
        supplements: supplements.map((sup) => ({
          data: sup._id.toString(),
          quantity: faker.number.int({ min: 1, max: sup.stock }),
        })),
        status: {
          confirmed: false,
        },
      })) as ICommand;
    } catch (error) {
      console.error(`Error creating command`, error);
      throw new Error("Error creating command");
    }
  },
  delete: async (idCommand: string): Promise<void> => {
    try {
      const command: ICommand | null = await CommandModel.findById(
        idCommand
      ).populate<{
        "supplements.data": ISupplement;
      }>({
        path: "supplements.data",
      });
      if (!command) {
        throw new Error("Command Test not found to delete");
      }
      for (const supObj of command.supplements) {
        await CategoryModel.findOneAndDelete({ _id: supObj.data.category });
        await SupplementModel.findOneAndDelete({ _id: supObj.data._id });
      }
      await CommandModel.findOneAndDelete({ _id: idCommand });
    } catch (error) {
      console.error(`Error deleting command`, error);
      throw new Error("Error deleting command");
    }
  },
};
