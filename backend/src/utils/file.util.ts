import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

export const deleteFile = async (idFile: string) => {
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);
  try {
    await gridFSBucket.delete(new mongoose.Types.ObjectId(idFile));
  } catch (deleteErr) {
    console.error(`Error deleting file from GridFS.`, deleteErr);
    // throw new Error(deleteErr);
  }
};
