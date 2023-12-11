import supertest from "supertest";

import { getAccessTokenAdminTest, getEndDate } from "../../../utils/test.util";
import { app } from "../../../../jest.setup";

describe("PUT /discount/:idDiscount", () => {
  let adminAccessToken: string | undefined;

  const discount = {
    title: "Serious Mass",
    percentage: 30,
    dateEnd: getEndDate(),
    description: "Gainer",
  };

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  it("should return an errors array of validation fields", async () => {
    const wrongData = {
      title: 1234,
      percentage: 150,
      dateBegin: "2023-12-10",
      dateEnd: "2023-12-10",
      description: 56789,
    };

    const response = await supertest(app)
      .put("/discount/[invalid-idDiscount]")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(wrongData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(typeof response.body.message).toBe("string");
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors).toHaveLength(5);
  });
});
