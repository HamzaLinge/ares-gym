import { ErrorRequestHandler } from "express";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import multer from "multer";

import { CustomError } from "../types/common.types";

const centralizedErrors: ErrorRequestHandler = (
  err: CustomError | Error,
  req,
  res,
  next
) => {
  // The "stack" property is a standard that is already included into Error class
  console.error(err.stack);

  // Delete the uploaded file if there is an error
  if (req.fileId) {
    const gridFSBucket = new GridFSBucket(mongoose.connection.db);
    gridFSBucket
      .delete(new mongoose.Types.ObjectId(req.fileId))
      .catch((deleteErr) => {
        console.error("Error deleting file from GridFS:", deleteErr);
      });
  }

  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res
      .status(400)
      .send({ message: "File size exceeds the maximum limit (10MB)" });
  }

  const statusCode = err instanceof CustomError ? err.statusCode : 500;
  const responsePayload: any = {
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };
  // Check if the error has a 'errors' property and include it in the response
  if (err instanceof CustomError && err.errors) {
    responsePayload.errors = err.errors;
  }

  res.status(statusCode).json(responsePayload);
};

export default centralizedErrors;
