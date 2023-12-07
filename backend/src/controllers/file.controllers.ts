import { Request, Response, NextFunction } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

import { CustomError } from "../types/common.types";
import { IRequest_file_get } from "../types/file.types";

export const file_get_controller = (
  req: Request<IRequest_file_get>,
  res: Response,
  next: NextFunction
) => {
  const idFile = req.params.fileId;
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);

  const downloadStream = gridFSBucket.openDownloadStream(
    new mongoose.Types.ObjectId(idFile)
  );

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    next(new CustomError(`Error to retrieve file: ${idFile}`, 400));
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};
