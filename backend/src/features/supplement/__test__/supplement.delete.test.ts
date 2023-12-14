import supertest from "supertest";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";

import { getAccessTokenAdminTest } from "../../../utils/test.util";
import CategoryModel, { ICategory } from "../../../models/Category";
import SupplementModel, { ISupplement } from "../../../models/Supplement";

describe("DELETE /supplement/", () => {
  let adminAccessToken: string | undefined;
  let idSupplementTest: string = "";

  const categoryTestData = { name: faker.word.noun() };

  let supplementTestData = {
    name: faker.word.noun(),
    category: "",
    price: faker.commerce.price(),
    stock: faker.number.int({ max: 100 }),
    filePath: "supplement-1-img-jpg",
  };

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  beforeEach(async () => {
    try {
      const categoryTest = (await CategoryModel.create(
        categoryTestData
      )) as ICategory;
      supplementTestData.category = categoryTest._id;
      const supplementTest = (await SupplementModel.create(
        supplementTestData
      )) as ISupplement;
      idSupplementTest = supplementTest._id;
    } catch (error) {
      console.error(
        `Error creating category and supplement for DELETE /supplement/ => ${error}`
      );
      throw new Error(
        `Error creating category and supplement for DELETE /supplement/`
      );
    }
  });
  afterEach(async () => {
    try {
      await CategoryModel.findOneAndDelete({ name: categoryTestData.name });
      await SupplementModel.findOneAndDelete({ name: supplementTestData.name });
      idSupplementTest = "";
    } catch (error) {
      console.error(
        `Error deleting category and supplement for DELETE /supplement/ => ${error}`
      );
      throw new Error(
        `Error deleting category and supplement for DELETE /supplement/`
      );
    }
  });
  it("should return the id deleted supplement successfully", async () => {
    const res = await supertest(app)
      .delete(`/supplement/${idSupplementTest}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.deletedIdSupplement).toBeDefined();
  });
});
