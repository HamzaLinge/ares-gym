import { getAccessTokenAdminTest } from "../../../utils/test.util";
import supertest from "supertest";
import { app } from "../../../../jest.setup";
import CategoryModel, { ICategory } from "../../../models/Category";

describe("POST /category/", () => {
  let adminAccessToken: string | undefined;

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  it("should return errors validation fields", async () => {
    const wrongCategoryData = {
      name: 1234, // Must be a string type
      description: "some-desc",
      parent: "invalid-mongo-id", // If provided, it must be a valid mongoid
    };
    const res = await supertest(app)
      .post("/category/")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(wrongCategoryData);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body).toHaveProperty("message");
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors).toHaveLength(2);
  });

  describe("Create Category", () => {
    let categoryData = {
      name: "Protein",
      description: "Supplement Protein",
      parent: "Will-be-filled-with-beforeAll",
    };
    beforeAll(async () => {
      const categoryParentTest = { name: "Vitamin" };
      try {
        const createdCategoryParentTest: ICategory = await CategoryModel.create(
          categoryParentTest
        );
        categoryData.parent = createdCategoryParentTest._id.toString();
      } catch (error) {
        console.error(
          `Error creating category parent test for POST request => ${error}`
        );
        throw new Error("Error creating category parent test for POST request");
      }
    });
    afterAll(async () => {
      try {
        await CategoryModel.findOneAndDelete({
          _id: categoryData.parent,
        });
        await CategoryModel.findOneAndDelete({
          name: categoryData.name.toLowerCase(),
        });
      } catch (error) {
        console.error(
          `Error deleting categories test for POST request => ${error}`
        );
        throw new Error("Error deleting categories test for POST request");
      }
    });
    it("should return a created category successfully", async () => {
      const res = await supertest(app)
        .post("/category/")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(categoryData);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("category");
      expect(res.body.category).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          parent: expect.any(String),
        })
      );
    });
  });
});
