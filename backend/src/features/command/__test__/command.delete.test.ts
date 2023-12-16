import { getSubscriberTest } from "../../../utils/test.util";
import { commandTestMethods } from "./command.test.util";
import supertest from "supertest";
import { app } from "../../../../jest.setup";
import { ICommand } from "../../../models/Command";
import { supplementTestMethods } from "../../supplement/__test__/supplement.test.util";

describe("DELETE /command/ for Subscriber", () => {
  let command: ICommand;
  let subscriberId: string;
  let subscriberAccessToken: string;

  beforeAll(async () => {
    const loggedUser = await getSubscriberTest();
    subscriberId = loggedUser.user._id;
    subscriberAccessToken = loggedUser.tokens.accessToken;
  });
  beforeEach(async () => {
    command = await commandTestMethods.create(subscriberId);
  });
  afterEach(async () => {
    for (const supplement of command.supplements) {
      await supplementTestMethods.delete(supplement.data);
    }
  });
  it("should return a 200 status and id deleted command", async () => {
    const res = await supertest(app)
      .delete(`/command/${command._id}`)
      .set("Authorization", `Bearer ${subscriberAccessToken}`);
    expect(res.status).toBe(200);
    expect(res.body.idDeletedCommand).toBeDefined();
  });
});
