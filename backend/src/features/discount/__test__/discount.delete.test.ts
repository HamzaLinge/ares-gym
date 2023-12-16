import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getAdminTest, getEndDate } from "../../../utils/test.util";
import DiscountModel, { IDiscount } from "../../../models/Discount";

describe("DELETE /discount/", () => {
  let adminAccessToken: string;

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });
  let idDiscountParam: string;
  const discount = {
    title: "Muscles",
    percentage: 50,
    dateBegin: new Date().toISOString(),
    dateEnd: getEndDate(),
    description: "For Big Guys",
  };
  beforeEach(async () => {
    try {
      const createdDiscount: IDiscount = await DiscountModel.create(discount);
      idDiscountParam = createdDiscount._id.toString();
    } catch (error) {
      console.error(`Something went wrong when creating discount => ${error}`);
      throw new Error("Something went wrong when creating discount");
    }
  });

  afterEach(async () => {
    try {
      await DiscountModel.findOneAndDelete({ _id: idDiscountParam });
      idDiscountParam = "";
    } catch (error) {
      console.error(`Something went wrong when deleting discount => ${error}`);
      throw new Error("Something went wrong when deleting discount");
    }
  });
  it("should return successful message about the deleted discount", async () => {
    const res = await supertest(app)
      .delete(`/discount/${idDiscountParam}`)
      .set("Authorization", `Bearer ${adminAccessToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(typeof res.body.message).toBe("string");
  });
});
