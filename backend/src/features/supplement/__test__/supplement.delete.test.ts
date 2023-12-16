import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { supplementTestMethods } from "./supplement.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("DELETE /supplement/", () => {
  let adminAccessToken: string;
  let idSupplementTest: string;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  beforeEach(async () => {
    idSupplementTest = (await supplementTestMethods.create())._id;
  });
  afterEach(async () => {
    await supplementTestMethods.delete(idSupplementTest);
    idSupplementTest = "";
  });
  it("should return OK status and the Deleted Id Supplement", async () => {
    const res = await supertest(app)
      .delete(`/supplement/${idSupplementTest}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body.deletedIdSupplement).toBeDefined();
  });
});
