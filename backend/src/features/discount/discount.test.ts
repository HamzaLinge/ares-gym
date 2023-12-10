import supertest from "supertest";

import { app, authTokenTest } from "../../../jest.setup";
import { IRequest_discount_post } from "./discount.type";

describe("POST /discount/", () => {
  it("should return a created discount successfully", async () => {
    const requestData: IRequest_discount_post = {
      title: "MegaMass",
      percentage: 40,
      dateEnd: new Date("2023-12-11"),
      description: "Gainer",
    };

    const response = await supertest(app)
      .post("/discount/")
      .set("Authorization", `Bearer ${authTokenTest}`)
      .send(requestData);

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe("object");
    expect(response.body).toHaveProperty("discount");

    const discountObj = response.body.discount;
    expect(discountObj).toHaveProperty("title");
    expect(discountObj).toHaveProperty("percentage");
    expect(discountObj).toHaveProperty("dateBegin");
    expect(discountObj).toHaveProperty("dateEnd");
    expect(discountObj).toHaveProperty("description");
  });
  it("should return errors validation array", async () => {
    const requestData = {
      title: 1234,
      percentage: 0,
      dateEnd: "2023-12-11",
      description: "Gainer",
    };
    const response = await supertest(app)
      .post("/discount/")
      .set("Authorization", `Bearer ${authTokenTest}`)
      .send(requestData);
    expect(response.status).toBe(400);
  });
});
