import supertest from "supertest";
import path from "path";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";

import {
  expectedRuleErrorsFields,
  getAdminTest,
} from "../../../utils/test.util";
import { deleteFile } from "../../../utils/file.util";
import { discountTestUtil, getEndDate } from "./discount.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("POST /discount/", () => {
  let adminAccessToken: string;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  it("should return a BAD REQUEST for validation fields", async () => {
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
    expect(response.status).toBe(HttpStatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedRuleErrorsFields),
      ])
    );
    expect(response.body.errors).toHaveLength(2);
  });

  describe("Create Discount", () => {
    let idDiscount: string;
    const discountRequest = {
      title: faker.lorem.word(),
      percentage: faker.number.int({ min: 10, max: 100 }),
      dateBegin: new Date().toISOString(),
      dateEnd: getEndDate(),
      description: faker.lorem.sentence(2),
      filePath: "discount-img.jpg", // Static image
    };

    afterEach(async () => {
      if (idDiscount) {
        await discountTestUtil.delete(idDiscount);
      }
    });

    it("should return an OK with the Created Discount", async () => {
      const response = await supertest(app)
        .post("/discount/")
        .field("title", discountRequest.title)
        .field("percentage", discountRequest.percentage)
        .field("dateBegin", discountRequest.dateBegin)
        .field("dateEnd", discountRequest.dateEnd)
        .field("description", discountRequest.description)
        .attach("file", path.resolve(__dirname, discountRequest.filePath))
        .set("Authorization", `Bearer ${adminAccessToken}`);

      expect(response.status).toBe(HttpStatusCodes.OK);
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
      idDiscount = response.body.discount._id;
    });
    describe("Same Discount Title", () => {
      beforeEach(async () => {
        idDiscount = (await discountTestUtil.create())._id;
      });
      it("should return a CONFLICT Error because there is already a discount with the same title that has not yet expired", async () => {
        const response = await supertest(app)
          .post("/discount/")
          .set("Authorization", `Bearer ${adminAccessToken}`)
          .field("title", discountRequest.title)
          .field("percentage", discountRequest.percentage)
          .field("dateBegin", discountRequest.dateBegin)
          .field("dateEnd", discountRequest.dateEnd)
          .field("description", discountRequest.description);

        expect(response.status).toBe(HttpStatusCodes.CONFLICT);
        expect(response.body).toHaveProperty("message");
        expect(typeof response.body.message).toBe("string");
      });
    });
  });
});
