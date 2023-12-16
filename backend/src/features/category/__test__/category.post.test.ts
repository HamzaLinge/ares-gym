import supertest from "supertest";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { ICategory } from "../../../models/Category";
import { HttpStatusCodes } from "../../../utils/error.util";
import { categoryTestMethods } from "./category.test.util";

describe("POST /category/", () => {
  let adminAccessToken: string;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  it("should return BAD REQUEST due the validation fields", async () => {
    const wrongCategoryData = {
      name: 1234, // Must be a string type
      description: "some-desc",
      parent: "invalid-mongo-id", // If provided, it must be a valid mongoid
    };
    const res = await supertest(app)
      .post("/category/")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(wrongCategoryData);
    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("message");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors).toHaveLength(2);
  });

  describe("Create Category", () => {
    let categoryParentTest: ICategory;
    let idCategoryTest: string;
    let categoryData = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(2),
      parent: "Will-be-filled-with-beforeAll",
    };
    beforeAll(async () => {
      categoryParentTest = await categoryTestMethods.create();
      categoryData.parent = categoryParentTest._id;
    });
    afterAll(async () => {
      await categoryTestMethods.delete(categoryParentTest._id);
      await categoryTestMethods.delete(idCategoryTest);
    });
    it("should return OK status for created category", async () => {
      const res = await supertest(app)
        .post("/category/")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(categoryData);
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body).toHaveProperty("category");
      expect(res.body.category).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          parent: expect.any(String),
        })
      );
      idCategoryTest = res.body.category._id;
    });
  });
});
