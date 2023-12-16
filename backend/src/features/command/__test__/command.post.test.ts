import supertest from "supertest";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";
import { getSubscriberTest } from "../../../utils/test.util";
import { supplementTestMethods } from "../../supplement/__test__/supplement.test.util";
import { commandTestMethods } from "./command.test.util";

describe("POST /command/ for Subscriber", () => {
  let subscriberAccessToken: string | undefined;

  beforeAll(async () => {
    const userLogged = await getSubscriberTest();
    subscriberAccessToken = userLogged.tokens.accessToken;
    if (subscriberAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  it("should return an errors validation fields", async () => {
    const wrongData = {
      supplements: [
        {
          data: "invalid-mongo-id", // data must be a valid mongoid
          quantity: 0, // quantity must be at least one
        },
      ],
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

  describe("Create Command", () => {
    let idCreatedCommand: string = "";
    const supplements: { data: string; quantity: number }[] = [];

    beforeEach(async () => {
      try {
        const supplement = await supplementTestMethods.create();
        supplements.push({
          data: supplement._id,
          quantity: faker.number.int({ min: 1, max: supplement.stock }),
        });
      } catch (error) {
        console.error(
          `Error creating Supplements for POST /command/ => ${error}`
        );
        throw new Error(`Error creating Supplements for POST /command/`);
      }
    });

    afterEach(async () => {
      try {
        await commandTestMethods.delete(idCreatedCommand);
      } catch (error) {
        console.error(`Error deleting Command for POST /command/ => ${error}`);
        throw new Error(`Error deleting Command for POST /command/`);
      }
    });
    it("should return a created command successfully", async () => {
      let commandDataTest = {
        supplements: supplements,
        note: "some-note-about-this-command",
      };
      const res = await supertest(app)
        .post("/command/")
        .set("Authorization", `Bearer ${subscriberAccessToken}`)
        .send(commandDataTest);
      expect(res.status).toBe(200);
      expect(res.body.command).toBeDefined();
      idCreatedCommand = res.body.command._id;
    });
  });
});
