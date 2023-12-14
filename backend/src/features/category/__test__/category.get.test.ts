import supertest from "supertest";

import { app } from "../../../../jest.setup";
import { deleteCategories, uploadCategories } from "./category.test.util";

describe("GET /category/", () => {
  const categories = [
    { name: "Creatine" },
    { name: "Glutamine" },
    { name: "Micronized", parentName: "Creatine" },
    { name: "Peptides", parentName: "Glutamine" },
    { name: "Flavored", parentName: "Micronized" },
  ];
  beforeAll(async () => {
    try {
      await uploadCategories(categories);
    } catch (error) {
      console.error(`Error creating categories for GET request => ${error}`);
      throw new Error(`Error creating categories for GET request`);
    }
  });
  afterAll(async () => {
    try {
      await deleteCategories(categories);
    } catch (error) {
      console.error(`Error deleting categories for GET request => ${error}`);
      throw new Error(`Error deleting categories for GET request`);
    }
  });
  it("should return a tree of all categories", async () => {
    const res = await supertest(app).get("/category/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("categoryTree");
    expect(Array.isArray(res.body.categoryTree)).toBe(true);
    // console.log(JSON.stringify(res.body.categoryTree, null, 2));
  });
});
