import supertest from "supertest";

import { getAccessTokenAdminTest, getEndDate } from "../../../utils/test.util";
import { app } from "../../../../jest.setup";
import DiscountModel, { IDiscount } from "../../../models/Discount";

describe("PUT /discount/:idDiscount", () => {
  let adminAccessToken: string | undefined;

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  it("should return an error validation field", async () => {
    const wrongData = {
      title: 1234,
      percentage: 150,
      dateBegin: "2023-12-10",
      dateEnd: "2023-12-10",
      description: 56789,
    };

    const response = await supertest(app)
      .put("/discount/[invalid-mongo-id]")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(wrongData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toBe("string");
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toHaveLength(5);
  });

  describe("Edit Discount", () => {
    let idDiscountParam: string;
    const discount = {
      title: "Serious Mass",
      percentage: 30,
      dateBegin: new Date().toISOString(),
      dateEnd: getEndDate(),
      description: "Gainer",
      filePath: "discount-img.jpg",
    };
    beforeEach(async () => {
      try {
        const createdDiscount: IDiscount = await DiscountModel.create(discount);
        idDiscountParam = createdDiscount._id.toString();
      } catch (error) {
        console.error(
          `Something went wrong when creating discount => ${error}`
        );
        throw new Error("Something went wrong when creating discount");
      }
    });

    afterEach(async () => {
      try {
        await DiscountModel.findOneAndDelete({ _id: idDiscountParam });
        idDiscountParam = "";
      } catch (error) {
        console.error(
          `Something went wrong when deleting discount => ${error}`
        );
        throw new Error("Something went wrong when deleting discount");
      }
    });

    it("should return the updated discount successfully", async () => {
      const newInputDiscount = {
        description: "For big guys",
        percentage: 35,
      };
      const response = await supertest(app)
        .put(`/discount/${idDiscountParam}`)
        .set("Authorization", `Bearer ${adminAccessToken}`)
        .send(newInputDiscount);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("discount");
      expect(response.body.discount).toMatchObject({
        percentage: newInputDiscount.percentage,
        description: newInputDiscount.description.toLowerCase(),
      });
    });
  });
});
