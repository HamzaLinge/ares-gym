import supertest from "supertest";

import { app, authTokenTest } from "../../../jest.setup";

import { IRequest_command_post } from "./command.type";

describe("POST /command/", () => {
  it("should return an errors validation fields", async () => {
    const requestData: IRequest_command_post = {
      proteins: [{ data: "not-valid-mongodb-id", quantity: 0 }],
      discount: {
        data: "not-valid-mongodb-id",
      },
      note: "your_note",
    };

    const response = await supertest(app)
      .post("/command/")
      .send(requestData)
      .set("Authorization", `Bearer ${authTokenTest}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
    const errorsValidation = response.body.errors;
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
