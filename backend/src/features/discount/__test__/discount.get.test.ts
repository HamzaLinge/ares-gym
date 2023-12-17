import supertest from "supertest";

import { app } from "../../../../jest.setup";

import {
  expectedRuleErrorsFields,
  getSubscriberTest,
} from "../../../utils/test.util";
import { IDiscount } from "../../../models/Discount";
import { discountTestUtil } from "./discount.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("GET /discount/", () => {
  let subscriberAccessToken: string;

  beforeAll(async () => {
    subscriberAccessToken = (await getSubscriberTest()).tokens.accessToken;
  });

  it("should return a BAD REQUEST status for validation fields", async () => {
    const response = await supertest(app)
      .get("/discount/")
      .set("Authorization", `Bearer ${subscriberAccessToken}`)
      .query({
        idDiscount: "invalid-mongo-id",
        title: "some-title",
      });
    expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedRuleErrorsFields),
      ])
    );
    expect(response.body.errors).toHaveLength(3);
  });

  describe("Return Discount", () => {
    const nbrDiscount = 2;
    let discounts: IDiscount[] = [];

    beforeAll(async () => {
      for (let i = 0; i < nbrDiscount; i++) {
        discounts.push(await discountTestUtil.create());
      }
    });
    afterAll(async () => {
      for (const discount of discounts) {
        await discountTestUtil.delete(discount._id);
      }
    });

    it("should return an OK status with and array of all Discounts", async () => {
      const response = await supertest(app)
        .get("/discount/")
        .set("Authorization", `Bearer ${subscriberAccessToken}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body).toHaveProperty("discounts");
      expect(Array.isArray(response.body.discounts)).toBe(true);
      expect(response.body.discounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            percentage: expect.any(Number),
            dateBegin: expect.any(String),
            dateEnd: expect.any(String),
            description: expect.any(String),
          }),
        ])
      );
      expect(response.body.discounts).toHaveLength(nbrDiscount);
    });

    it("should return an OK status with an array of Discounts that match with Title query", async () => {
      const response = await supertest(app)
        .get("/discount/")
        .set("Authorization", `Bearer ${subscriberAccessToken}`)
        .query({ title: discounts[0].title.substring(0, 3) });

      expect(response.status).toBe(HttpStatusCodes.OK);
      expect(response.body).toHaveProperty("discounts");
      expect(Array.isArray(response.body.discounts)).toBe(true);
      expect(response.body.discounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            percentage: expect.any(Number),
            dateBegin: expect.any(String),
            dateEnd: expect.any(String),
            description: expect.any(String),
          }),
        ])
      );
      expect(response.body.discounts).toHaveLength(1);
    });
  });
});
