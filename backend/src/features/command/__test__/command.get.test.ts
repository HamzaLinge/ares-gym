import supertest from "supertest";

import { app } from "../../../../jest.setup";

import { getSubscriberTest } from "../../../utils/test.util";
import { commandTestMethods } from "./command.test.util";

describe("GET /command/ for Subscriber", () => {
  let commandId: string;
  let subscriberId: string;
  let subscriberAccessToken: string;

  beforeAll(async () => {
    const loggedUser = await getSubscriberTest();
    subscriberId = loggedUser.user._id;
    subscriberAccessToken = loggedUser.tokens.accessToken;
  });
  beforeEach(async () => {
    const command = await commandTestMethods.create(subscriberId);
    commandId = command._id;
  });
  afterEach(async () => {
    await commandTestMethods.delete(commandId);
    commandId = "";
  });
  it("should return a 200 status and an array of commands", async () => {
    const res = await supertest(app)
      .get("/command/")
      .set("Authorization", `Bearer ${subscriberAccessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.commands).toBeDefined();
  });
});
