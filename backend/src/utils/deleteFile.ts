import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

export const deleteFile = async (
  idFile: string,
  relatedDocumentName?: string
) => {
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);
  try {
    await gridFSBucket.delete(new mongoose.Types.ObjectId(idFile));
  } catch (deleteErr) {
    console.error(
      `Error deleting file from GridFS${
        relatedDocumentName ? ` for ${relatedDocumentName}` : ""
      } => `,
      deleteErr
    );
  }
};
