import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

export const deleteFile = (
  idFile: string,
  relatedDocumentName?: string
): void => {
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);
  gridFSBucket
    .delete(new mongoose.Types.ObjectId(idFile))
    .catch((deleteErr) => {
      console.error(
        `Error deleting file from GridFS${
          relatedDocumentName ? ` for ${relatedDocumentName}` : ""
        } => `,
        deleteErr
      );
    });
};
