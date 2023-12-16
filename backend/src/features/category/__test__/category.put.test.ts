import supertest from "supertest";
import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { ICategory } from "../../../models/Category";
import { categoryTestMethods } from "./category.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("PUT /category/", () => {
  let adminAccessToken: string;
  let category: ICategory;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
    category = await categoryTestMethods.create();
  });

  afterAll(async () => {
    await categoryTestMethods.delete(category._id);
  });

  it("should return OK status for updated category", async () => {
    const newData = {
      description: "Huge",
    };
    const res = await supertest(app)
      .put(`/category/${category._id}`)
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(newData);
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body).toHaveProperty("category");
    expect(typeof res.body.category).toBe("object");
    expect(res.body.category).toMatchObject({
      _id: expect.any(String),
      description: newData.description.toLowerCase(),
      name: category.name.toLowerCase(),
    });
  });
});
