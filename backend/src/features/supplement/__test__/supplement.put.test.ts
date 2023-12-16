import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { supplementTestMethods } from "./supplement.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("PUT /supplement/", () => {
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
  it("should return OK status and the Updated Supplement", async () => {
    const newData = { stock: 0 };
    const res = await supertest(app)
      .put(`/supplement/${idSupplementTest}`)
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(newData);
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body.supplement).toBeDefined();
  });
  // it("should return the updated supplement's thumbnails successfully", async () => {
  //   const res = await supertest(app)
  //     .put(`/supplement/files/${idSupplementTest}`)
  //     .set("Authorization", `Bearer ${adminAccessToken}`)
  //     .attach("files", supplementTestData.filePath);
  // });
});
