import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { supplementTestMethods } from "./supplement.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("GET /supplement/", () => {
  const supplementIds: string[] = [];
  beforeAll(async () => {
    for (let i = 0; i < 2; i++) {
      const supplement = await supplementTestMethods.create();
      supplementIds.push(supplement._id);
    }
  });
  afterAll(async () => {
    for (const idSupplement of supplementIds) {
      await supplementTestMethods.delete(idSupplement);
    }
  });
  it("should return OK status with all the supplements", async () => {
    const res = await supertest(app).get("/supplement/");
    expect(res.status).toBe(HttpStatusCodes.OK);
  });
});
