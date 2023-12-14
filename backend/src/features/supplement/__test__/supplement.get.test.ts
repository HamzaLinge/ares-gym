import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { faker } from "@faker-js/faker";
import CategoryModel, { ICategory } from "../../../models/Category";
import SupplementModel from "../../../models/Supplement";

describe("GET /supplement/", () => {
  const categoryTestData = { name: faker.word.noun() };
  let supplementsTestData = [
    {
      name: faker.word.noun(),
      category: "",
      price: faker.commerce.price(),
      stock: faker.number.int({ max: 100 }),
    },
    {
      name: faker.word.noun(),
      category: "",
      price: faker.commerce.price(),
      stock: faker.number.int({ max: 100 }),
    },
  ];
  beforeAll(async () => {
    try {
      const categoryTest = (await CategoryModel.create(
        categoryTestData
      )) as ICategory;
      for (let i = 0; i < supplementsTestData.length; i++) {
        supplementsTestData[i].category = categoryTest._id;
        await SupplementModel.create(supplementsTestData[i]);
      }
    } catch (error) {
      console.error(
        `Error creating category and supplements for GET /supplement/ => ${error}`
      );
      throw new Error(
        `Error creating category and supplements for GET /supplement/`
      );
    }
  });
  afterAll(async () => {
    try {
      await CategoryModel.findOneAndDelete({ name: categoryTestData.name });
      for (let i = 0; i < supplementsTestData.length; i++) {
        await SupplementModel.findOneAndDelete({
          name: supplementsTestData[i].name,
        });
      }
    } catch (error) {
      console.error(
        `Error deleting category and supplements for GET /supplement/ => ${error}`
      );
      throw new Error(
        `Error deleting category and supplements for GET /supplement/`
      );
    }
  });
  it("should return all the supplement successfully", async () => {
    const res = await supertest(app).get("/supplement/");
    expect(res.status).toBe(200);
  });
});
