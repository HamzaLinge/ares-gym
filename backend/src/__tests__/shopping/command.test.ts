import supertest from "supertest";
import { app } from "../../../jest.setup";

import {
  IRequest_shopping_command_post,
  IResponse_shopping_command_post,
} from "../../types/shopping/command.types";
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from "../../config/database"; // Adjust the path based on your project structure

// Define your authorization token
const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2NTRmZTljYzFhNGVhYjAyMjNhMDZmOTQiLCJpYXQiOjE3MDIxMjk4MjksImV4cCI6MTcwNDcyMTgyOX0.rOKwLFgr93IjS5d5YNWv-uww_fPOWQv0w8cn0FbPH9Y";

beforeAll(async () => {
  await openDatabaseConnection();
});

describe("GET /test", () => {
  it("should return a message successfully", async () => {
    const response = await supertest(app).get("/test").expect(200);
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});

// describe("POST /shopping/command/", () => {
//   it("should create a shopping command successfully", async () => {
//     // Mock input data based on IRequest_shopping_command_post
//     const requestData: IRequest_shopping_command_post = {
//       proteins: [{ data: "hgbfv", quantity: 1 }],
//       // discount: {
//       //   data: "your_discount_data",
//       // },
//       note: "your_note",
//     };

// Use supertest to make a request to your API endpoint
// const response = await supertest(app)
//   .post("/shopping/command/")
//   .send(requestData)
//   .set("Authorization", `Bearer ${authToken}`)
//   .expect(400);

// Verify the response structure based on IResponse_shopping_command_post
// const responseBody: IResponse_shopping_command_post = response.body;

// Add assertions to check the response body or other details
// expect(responseBody.command).toBeDefined();
//   });
// });
