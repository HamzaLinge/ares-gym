import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

import { IMetadataFile } from "./file.type";
import { CustomError } from "../../types/global.type";
import { HttpStatusCodes } from "../../utils/error.util";

export async function getFileMetadataFromGridFS(
  fileId: string
): Promise<IMetadataFile> {
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);
  try {
    const files = await gridFSBucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();
    if (!files || files.length === 0) {
      throw new CustomError("File not found", HttpStatusCodes.NOT_FOUND);
    }
    return files[0].metadata as IMetadataFile;
  } catch (error) {
    console.error("Error retrieving file metadata:", error);
    throw error;
  }
}
