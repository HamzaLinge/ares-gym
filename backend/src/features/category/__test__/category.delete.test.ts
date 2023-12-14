import { getAccessTokenAdminTest } from "../../../utils/test.util";
import CategoryModel from "../../../models/Category";
import supertest from "supertest";
import { app } from "../../../../jest.setup";

describe("DELETE /category/idCategory", () => {
  let adminAccessToken: string | undefined;
  let idDiscountTest: string = "";

  const categoryData = {
    name: "Creatine",
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
        `Error when creating a category for DELETE category => ${error}`
      );
      throw new Error("Error when creating a category for DELETE category");
    }
  });

  afterEach(async () => {
    try {
      await CategoryModel.findOneAndDelete({ _id: idDiscountTest });
      idDiscountTest = "";
    } catch (error) {
      console.error(
        `Error when deleting a category for DELETE category => ${error}`
      );
      throw new Error("Error when deleting a category for DELETE category");
    }
  });

  it("should return the deleted id category", async () => {
    const res = await supertest(app)
      .delete(`/category/${idDiscountTest}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("deletedIdCategory");
    expect(typeof res.body.deletedIdCategory).toBe("string");
  });
});
