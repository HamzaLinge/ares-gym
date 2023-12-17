import { NextFunction, Request, Response } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

import { CustomError } from "../../types/global.type";
import { IRequest_file_get } from "./file.type";
import { HttpStatusCodes } from "../../utils/error.util";
import { getFileMetadataFromGridFS } from "./file.util";

export async function file_get_controller(
  req: Request<IRequest_file_get>,
  res: Response,
  next: NextFunction
) {
  const idFile = req.params.fileId as string;
  const metadataFile = await getFileMetadataFromGridFS(idFile);
  res.setHeader("Content-Type", metadataFile.contentType);
  res.setHeader("X-Original-Name", metadataFile.originalName);
  res.setHeader("X-Upload-Date", metadataFile.uploadDate.toISOString());

  const gridFSBucket = new GridFSBucket(mongoose.connection.db);

  const downloadStream = gridFSBucket.openDownloadStream(
    new mongoose.Types.ObjectId(idFile)
  );
  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });
  downloadStream.on("error", () => {
    console.error("Stream error file:", idFile);
    next(
      new CustomError(
        `Error retrieving file: ${idFile}`,
        HttpStatusCodes.BAD_REQUEST
      )
    );
  });
  downloadStream.on("end", () => {
    res.end();
  });
}
