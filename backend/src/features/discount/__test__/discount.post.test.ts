import supertest from "supertest";
import path from "path";

import { app } from "../../../../jest.setup";

import {
  expectedRuleErrorsFields,
  getAdminTest,
  getEndDate,
} from "../../../utils/test.util";
import DiscountModel, { IDiscount } from "../../../models/Discount";
import { deleteFile } from "../../../utils/file.util";

describe("POST /discount/", () => {
  let adminAccessToken: string;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  describe("Create Discount", () => {
    const discountRequest = {
      title: "MegaMass",
      percentage: 40,
      dateBegin: new Date().toISOString(),
      dateEnd: getEndDate(),
      description: "Gainer",
      filePath: "discount-img.jpg",
    };

    afterEach(async () => {
      const deletedDiscount: IDiscount | null =
        await DiscountModel.findOneAndDelete({
          title: discountRequest.title.toLowerCase(),
        }).catch((error) => {
          throw new Error(
            "Error deleting discount after each Create Discount Test"
          );
        });
      if (deletedDiscount && deletedDiscount.thumbnail) {
        await deleteFile(deletedDiscount.thumbnail).catch((error) => {
          throw new Error(
            "Error deleting discount's file after each Create Discount Test"
          );
        });
      }
    });

    it("should return a created discount successfully", async () => {
      const response = await supertest(app)
        .post("/discount/")
        .field("title", discountRequest.title)
        .field("percentage", discountRequest.percentage)
        .field("dateBegin", discountRequest.dateBegin)
        .field("dateEnd", discountRequest.dateEnd)
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
        .field("title", discountRequest.title)
        .field("percentage", discountRequest.percentage)
        .field("dateBegin", discountRequest.dateBegin)
        .field("dateEnd", discountRequest.dateEnd)
        .field("description", discountRequest.description);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.message).toBe("string");
    });
  });

  it("should return some errors validation fields", async () => {
    const wrongData = {
      title: "some-title",
      percentage: 0, // percentage must be between 1 and 100 (1% < percentage <= 100%)
      dateBegin: "2023-12-11",
      dateEnd: "2023-12-11", // dateEnd must be after dateBegin by at least one day, which is the current date in this case
      description: "some-desc", // dateEnd must be after dateBegin by at least one day, which is the current date in this case
      filePath: "discount-img.jpg", // Note: After the error, the file uploaded must be deleted from the database
    };
    const response = await supertest(app)
      .post("/discount/")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .field("title", wrongData.title)
      .field("percentage", wrongData.percentage)
      .field("dateBegin", wrongData.dateBegin)
      .field("dateEnd", wrongData.dateEnd)
      .field("description", wrongData.description)
      .attach("file", path.resolve(__dirname, wrongData.filePath));

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedRuleErrorsFields),
      ])
    );
    expect(response.body.errors).toHaveLength(2);
  });
});
