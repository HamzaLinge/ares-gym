import { faker } from "@faker-js/faker";
import {
  processAndUploadFile,
  streamToGridFS,
} from "../../../middlewares/fileUpload";
import { deleteFile } from "../../../utils/file.util";
import supertest from "supertest";
import { app } from "../../../../jest.setup";
import path from "path";
import fs from "fs";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import { HttpStatusCodes } from "../../../utils/error.util";

describe("GET /file/", () => {
  let fileId: string = "";
  beforeAll(async () => {
    const gridFSBucket = new GridFSBucket(mongoose.connection.db);
    const mockFile = {
      path: path.resolve(__dirname, "test-img.png"),
      originalname: "test-img.png",
      mimetype: "image/png",
    };
    const mockMetadataFile = {
      contentType: "image",
      originalName: "test-img.png",
      uploadDate: new Date(),
    };
    const readStream = fs.createReadStream(mockFile.path);
    fileId = await streamToGridFS(
      gridFSBucket,
      mockFile.originalname,
      readStream,
      mockMetadataFile
    );
  });
  afterAll(async () => {
    await deleteFile(fileId);
    fileId = "";
  });
  it("should return the file", async () => {
    const res = await supertest(app).get(`/file/${fileId}`);
    expect(res.status).toBe(HttpStatusCodes.OK);
    expect(res.headers["content-type"]).toMatch(/image/);
  });
});
