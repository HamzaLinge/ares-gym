import DiscountModel, { IDiscount } from "../../../models/Discount";
import { faker } from "@faker-js/faker";
import { deleteFile } from "../../../utils/file.util";

// Set up end date to be sure that it is after the current date
export const getEndDate = (days: number = 1) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  return endDate.toISOString();
};

export const discountTestUtil = {
  create: async (): Promise<IDiscount> => {
    try {
      const dataDiscount = {
        title: faker.lorem.word(),
        percentage: faker.number.int({ min: 10, max: 100 }),
        dateBegin: new Date().toISOString(),
        dateEnd: getEndDate(),
        description: faker.lorem.sentence(2),
      };
      return (await DiscountModel.create(dataDiscount)) as IDiscount;
    } catch (error) {
      console.error(`Error when creating discount test`, error);
      throw new Error("Error when creating discount test");
    }
  },
  delete: async (idDiscount: string): Promise<void> => {
    try {
      const deletedDiscount: IDiscount | null =
        await DiscountModel.findOneAndDelete({ _id: idDiscount });
      if (deletedDiscount && deletedDiscount.thumbnail)
        await deleteFile(deletedDiscount.thumbnail);
    } catch (error) {
      console.error(`Error when deleting discount test`, error);
      throw new Error("Error when deleting discount test");
    }
  },
};
