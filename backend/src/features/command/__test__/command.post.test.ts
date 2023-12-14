import supertest from "supertest";

import { app } from "../../../../jest.setup";
import { getAccessTokenSubscriberTest } from "../../../utils/test.util";

describe("POST /command/ for Subscriber", () => {
  let subscriberAccessToken: string | undefined;

  beforeAll(async () => {
    subscriberAccessToken = await getAccessTokenSubscriberTest();
    if (subscriberAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  it("should return an errors validation fields", async () => {
    const wrongData = {
      proteins: [{ data: "invalid-mongo-id", quantity: 0 }], // data must be a valid mongoid and quantity must be at least one
      discount: "invalid-mongo-id", // If discount is provided, it must be a valid mongoid
      note: "some-note",
    };

    const response = await supertest(app)
      .post("/command/")
      .send(wrongData)
      .set("Authorization", `Bearer ${subscriberAccessToken}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBe(3);
  });

  // it("should return a created command successfully", async () => {
  //   const requestData: IRequest_command_post = {
  //     proteins: [{ data: "6571b15b70e2eac2b4558223", quantity: 5 }],
  //     discount: {
  //       data: "65522cb67e99307a382afdf1",
  //     },
  //     note: "your_note",
  //   };
  // });
});
