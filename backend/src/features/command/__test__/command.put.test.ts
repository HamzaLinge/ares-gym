import { getSubscriberTest } from "../../../utils/test.util";
import { commandTestMethods } from "./command.test.util";
import supertest from "supertest";
import { app } from "../../../../jest.setup";
import { faker } from "@faker-js/faker";

describe("PUT /command/ for Subscriber", () => {
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
  it("should return a 401 status for unauthorized access", async () => {
    // Subscriber attempting to edit command status
    const newData = {
      status: {},
    };
    const res = await supertest(app)
      .put(`/command/${commandId}`)
      .set("Authorization", `Bearer ${subscriberAccessToken}`)
      .send(newData);
    expect(res.status).toBe(401);
    expect(res.body.message).toBeDefined();
    expect(typeof res.body.message).toBe("string");
  });
  it("should return a 200 status and a command object", async () => {
    const newData = {
      note: faker.lorem.sentence(2),
    };
    const res = await supertest(app)
      .put(`/command/${commandId}`)
      .set("Authorization", `Bearer ${subscriberAccessToken}`)
      .send(newData);
    expect(res.status).toBe(200);
    expect(res.body.command).toBeDefined();
    expect(res.body.command).toMatchObject({
      note: newData.note.toLowerCase(),
    });
  });
});
