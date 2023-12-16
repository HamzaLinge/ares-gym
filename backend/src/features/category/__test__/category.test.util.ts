import { faker } from "@faker-js/faker";

import CategoryModel, { ICategory } from "../../../models/Category";

async function createCategory(
  categories: { name: string; parentName?: string }[],
  categoryData: { name: string; parentName?: string },
  parent: string | undefined = undefined
): Promise<void> {
  try {
    const category: ICategory = new CategoryModel({
      name: categoryData.name,
      parent,
    });
    await category.save();

    const children = categories.filter(
      (c) => c.parentName === categoryData.name
    );
    for (const child of children) {
      await createCategory(categories, child, category._id);
    }
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    throw new Error("Error creating category");
  }
}

export async function uploadCategories(
  categories: { name: string; parentName?: string }[]
) {
  try {
    for (const category of categories.filter((c) => !c.parentName)) {
      await createCategory(categories, category);
    }
  } catch (error) {
    console.error(`Error uploading categories: ${error}`);
    throw new Error("Error uploading categories");
  }
}

export async function deleteCategories(
  categories: { name: string; parentName?: string }[]
) {
  try {
    for (const category of categories) {
      await CategoryModel.findOneAndDelete({
        name: category.name.toLowerCase(),
      });
    }
  } catch (error) {
    console.error(`Error deleting categories: ${error}`);
    throw new Error("Error deleting categories");
  }
}

export const categoryTestMethods = {
  create: async (): Promise<ICategory> => {
    try {
      return (await CategoryModel.create({
        name: faker.word.noun(),
      })) as ICategory;
    } catch (error) {
      console.error(`Error creating category => ${error}`);
      throw new Error("Error creating category");
    }
  },
  delete: async (idCategory: string): Promise<void> => {
    try {
      await CategoryModel.findOneAndDelete({ _id: idCategory });
    } catch (error) {
      console.error(`Error deleting category => ${error}`);
      throw new Error("Error deleting category");
    }
  },
};
