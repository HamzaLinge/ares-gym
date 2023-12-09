import supertest from "supertest";

import { app, authTokenTest } from "../../../jest.setup";

import { IRequest_shopping_command_post } from "./command.type";

describe("POST /shopping/command/", () => {
  it("should return an errors validation fields", async () => {
    const requestData: IRequest_shopping_command_post = {
      proteins: [{ data: "not-valid-mongodb-id", quantity: 0 }],
      discount: {
        data: "not-valid-mongodb-id",
      },
      note: "your_note",
    };

    const response = await supertest(app)
      .post("/shopping/command/")
      .send(requestData)
      .set("Authorization", `Bearer ${authTokenTest}`);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ["msg"]: "Each Protein Data must be a valid MongoDB ID",
        }),
      ])
    );
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ["msg"]: "Discount Data must be a valid MongoDB ID",
        }),
      ])
    );
  });
});
