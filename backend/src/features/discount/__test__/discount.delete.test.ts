import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { discountTestUtil } from "./discount.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("DELETE /discount/", () => {
  let adminAccessToken: string;
  let idDiscount: string;
  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });
  beforeEach(async () => {
    idDiscount = (await discountTestUtil.create())._id;
  });
  afterEach(async () => {
    await discountTestUtil.delete(idDiscount);
    idDiscount = "";
  });
  it("should return an OK status the Id Deleted Discount", async () => {
    const res = await supertest(app)
      .delete(`/discount/${idDiscount}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body).toHaveProperty("idDeletedDiscount");
    expect(typeof res.body.idDeletedDiscount).toBe("string");
  });
});
