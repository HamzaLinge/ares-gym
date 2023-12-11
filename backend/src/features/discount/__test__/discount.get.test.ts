import supertest from "supertest";

import { app } from "../../../../jest.setup";
import {
  expectedRuleErrorsFields,
  getAccessTokenSubscriberTest,
  getEndDate,
} from "../../../utils/test.util";
import DiscountModel from "../../../models/Discount";

describe("GET /discount/", () => {
  let subscriberAccessToken: string | undefined;

  const discounts = [
    {
      title: "Omega",
      percentage: 40,
      dateEnd: getEndDate(),
      description: "Energize",
    },
    {
      title: "Whey",
      percentage: 20,
      dateEnd: getEndDate(),
      description: "Isolate",
    },
  ];

  beforeAll(async () => {
    subscriberAccessToken = await getAccessTokenSubscriberTest();
    if (subscriberAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  describe("Return Discount", () => {
    beforeAll(async () => {
      for (let i = 0; i < discounts.length; i++) {
        await DiscountModel.create(discounts[i]);
      }
    });
    afterAll(async () => {
      for (let i = 0; i < discounts.length; i++) {
        await DiscountModel.findOneAndDelete({
          title: discounts[i].title.toLowerCase(),
        });
      }
    });

    it("should return an array of all discounts", async () => {
      const response = await supertest(app)
        .get("/discount/")
        .set("Authorization", `Bearer ${subscriberAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("discounts");
      expect(Array.isArray(response.body.discounts)).toBe(true);
      expect(response.body.discounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            percentage: expect.any(Number),
            dateEnd: expect.any(String),
            description: expect.any(String),
          }),
        ])
      );
      expect(response.body.discounts).toHaveLength(2);
    });

    it("should return an array of discounts that match with title query", async () => {
      const response = await supertest(app)
        .get("/discount/")
        .set("Authorization", `Bearer ${subscriberAccessToken}`)
        .query({ title: discounts[0].title.substring(0, 3) });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("discounts");
      expect(Array.isArray(response.body.discounts)).toBe(true);
      expect(response.body.discounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(String),
            title: expect.any(String),
            percentage: expect.any(Number),
            dateEnd: expect.any(String),
            description: expect.any(String),
          }),
        ])
      );
      expect(response.body.discounts).toHaveLength(1);
    });
  });

  it("should return errors, an array of validation fields", async () => {
    const response = await supertest(app)
      .get("/discount/")
      .set("Authorization", `Bearer ${subscriberAccessToken}`)
      .query({
        idDiscount: "some-invalid-id",
        title: "some-title",
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedRuleErrorsFields),
      ])
    );
    expect(response.body.errors).toHaveLength(3);
  });
});
