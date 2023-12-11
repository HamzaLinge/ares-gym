import supertest from "supertest";
import path from "path";

import { app } from "../../../../jest.setup";
import {
  expectedRuleErrorsFields,
  getAccessTokenAdminTest,
  getEndDate,
} from "../../../utils/test.util";
import DiscountModel, { IDiscount } from "../../../models/Discount";
import { deleteFile } from "../../../utils/deleteFile";

describe("POST /discount/", () => {
  let adminAccessToken: string | undefined;

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  describe("Create Discount", () => {
    const discountRequest = {
      title: "MegaMass",
      percentage: 40,
      dateEnd: new Date(),
      description: "Gainer",
      filePath: "discount-img.jpg",
    };

    afterEach(async () => {
      const deletedDiscount: IDiscount | null =
        await DiscountModel.findOneAndDelete({
          title: discountRequest.title.toLowerCase(),
        });
      if (deletedDiscount && deletedDiscount.thumbnail) {
        deleteFile(deletedDiscount.thumbnail);
      }
    });

    it("should return a created discount successfully", async () => {
      const response = await supertest(app)
        .post("/discount/")
        .field("title", discountRequest.title)
        .field("percentage", discountRequest.percentage)
        .field("dateEnd", discountRequest.dateEnd.toISOString())
        .field("description", discountRequest.description)
        .attach("file", path.resolve(__dirname, discountRequest.filePath))
        .set("Authorization", `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("discount");
      expect(response.body.discount).toMatchObject({
        _id: expect.any(String),
        title: expect.any(String),
        percentage: expect.any(Number),
        dateBegin: expect.any(String),
        dateEnd: expect.stringMatching(
          /^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        ),
        description: expect.any(String),
        thumbnail: expect.any(String),
      });
    });

    it("should return an error because there is already a discount with the same title that has not yet expired", async () => {
      await DiscountModel.create(discountRequest);
      const response = await supertest(app)
        .post("/discount/")
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(discountRequest);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.message).toBe("string");
    });
  });

  it("should return some errors validation fields", async () => {
    const wrongData = {
      title: 1234, // title must be a string type
      percentage: 0, // percentage must be between 1 and 100 (1% < percentage <= 100%)
      dateEnd: "2023-12-11", // dateEnd must be after dateBegin, which is the current date in this case
      description: { data: "Gainer" }, // description must be a string type
    };
    const response = await supertest(app)
      .post("/discount/")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(wrongData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedRuleErrorsFields),
      ])
    );
    expect(response.body.errors).toHaveLength(4);
  });
});
