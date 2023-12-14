import { getAccessTokenAdminTest } from "../../../utils/test.util";
import CategoryModel from "../../../models/Category";
import supertest from "supertest";
import { app } from "../../../../jest.setup";

describe("PUT /category/", () => {
  let adminAccessToken: string | undefined;
  let idDiscountTest: string = "";

  const categoryData = {
    name: "BCAA",
  };

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  beforeEach(async () => {
    try {
      const createdCategoryTest = await CategoryModel.create(categoryData);
      idDiscountTest = createdCategoryTest._id.toString();
    } catch (error) {
      console.error(
        `Error when creating a category for PUT category => ${error}`
      );
      throw new Error("Error when creating a category for PUT category");
    }
  });

  afterEach(async () => {
    try {
      await CategoryModel.findOneAndDelete({ _id: idDiscountTest });
      idDiscountTest = "";
    } catch (error) {
      console.error(
        `Error when deleting a category for PUT category => ${error}`
      );
      throw new Error("Error when deleting a category for PUT category");
    }
  });

  it("should return an updated category successfully", async () => {
    const newData = {
      description: "Huge",
    };
    console.log(idDiscountTest);
    const res = await supertest(app)
      .put(`/category/${idDiscountTest}`)
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(newData);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("category");
    expect(typeof res.body.category).toBe("object");
    expect(res.body.category).toMatchObject({
      _id: expect.any(String),
      description: newData.description.toLowerCase(),
      name: categoryData.name.toLowerCase(),
    });
  });
});
