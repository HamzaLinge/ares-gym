import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { ICategory } from "../../../models/Category";
import { HttpStatusCodes } from "../../../utils/error.util";
import { categoryTestMethods } from "./category.test.util";

describe("DELETE /category/", () => {
  let adminAccessToken: string;
  let categoryTest: ICategory;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  beforeEach(async () => {
    categoryTest = await categoryTestMethods.create();
  });

  afterEach(async () => {
    await categoryTestMethods.delete(categoryTest._id);
  });

  it("should return the Deleted Id Category", async () => {
    const res = await supertest(app)
      .delete(`/category/${categoryTest._id}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);

    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body).toHaveProperty("idDeletedCategory");
    expect(typeof res.body.idDeletedCategory).toBe("string");
  });
});
