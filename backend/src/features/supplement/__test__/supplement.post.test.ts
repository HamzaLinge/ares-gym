import supertest from "supertest";
import path from "path";
import { faker } from "@faker-js/faker";

import { app } from "../../../../jest.setup";

import { getAdminTest } from "../../../utils/test.util";
import { categoryTestMethods } from "../../category/__test__/category.test.util";
import { supplementTestMethods } from "./supplement.test.util";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("POST /supplement/", () => {
  let adminAccessToken: string;
  let idSupplement: string;

  let supplementTestData = {
    name: faker.lorem.word(),
    category: "will-be-filled-by-before-hook",
    price: parseInt(faker.finance.amount({ min: 1000 })),
    stock: faker.number.int({ min: 1, max: 100 }),
    filePaths: ["supplement-1-img.jpg", "supplement-2-img.jpg"],
  };

  beforeAll(async () => {
    adminAccessToken = (await getAdminTest()).tokens.accessToken;
  });

  beforeEach(async () => {
    const category = await categoryTestMethods.create();
    supplementTestData.category = category._id.toString();
  });

  afterEach(async () => {
    await supplementTestMethods.delete(idSupplement);
  });

  it("should return a new supplement successfully", async () => {
    const res = await supertest(app)
      .post("/supplement/")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .field("name", supplementTestData.name)
      .field("category", supplementTestData.category)
      .field("price", supplementTestData.price)
      .field("stock", supplementTestData.stock)
      .attach("files", path.resolve(__dirname, supplementTestData.filePaths[0]))
      .attach(
        "files",
        path.resolve(__dirname, supplementTestData.filePaths[1])
      );
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.body.supplement).toBeDefined();
    idSupplement = res.body.supplement._id;
  });
});
