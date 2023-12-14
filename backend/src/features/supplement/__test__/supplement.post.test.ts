import supertest from "supertest";

import { app } from "../../../../jest.setup";
import { getAccessTokenAdminTest } from "../../../utils/test.util";
import CategoryModel, { ICategory } from "../../../models/Category";
import SupplementModel, { ISupplement } from "../../../models/Supplement";
import path from "path";
import { deleteFile } from "../../../utils/deleteFile";

describe("POST /supplement/", () => {
  let adminAccessToken: string | undefined;

  const categoryTestData = { name: "Protein" };

  let supplementTestData = {
    name: "My Whey",
    category: "",
    price: 8000,
    stock: 5,
    filePaths: ["supplement-1-img.jpg", "supplement-2-img.jpg"],
  };

  beforeAll(async () => {
    adminAccessToken = await getAccessTokenAdminTest();
    if (adminAccessToken === undefined) {
      throw new Error("Access token is undefined. Check test setup.");
    }
  });

  beforeEach(async () => {
    try {
      const categoryTest: ICategory = await CategoryModel.create(
        categoryTestData
      );
      supplementTestData.category = String(categoryTest._id);
    } catch (error) {
      console.error(
        `Error when creating Category Test for POST /supplement/ => ${error}`
      );
      throw new Error(
        `Error when creating Category Test for POST /supplement/`
      );
    }
  });

  afterEach(async () => {
    try {
      await CategoryModel.findOneAndDelete({
        name: categoryTestData.name.toLowerCase(),
      });
      const deletedSupplement = (await SupplementModel.findOneAndDelete({
        name: supplementTestData.name.toLowerCase(),
      })) as ISupplement;
      if (deletedSupplement.thumbnails) {
        for (const fileId of deletedSupplement.thumbnails) {
          await deleteFile(fileId);
        }
      }
    } catch (error) {
      console.error(
        `Error when deleting Category Test and Supplement Test for POST /supplement/ => ${error}`
      );
      throw new Error(
        `Error when creating Category Test and Supplement Test for POST /supplement/`
      );
    }
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
    expect(res.status).toBe(200);
  });
});
