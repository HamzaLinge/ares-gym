import { ErrorRequestHandler } from "express";
import multer from "multer";

import { CustomError } from "../types/common.types";
import { deleteFile } from "../utils/deleteFile";

const centralizedErrors: ErrorRequestHandler = (
  err: CustomError | Error,
  req,
  res,
  next
) => {
  // The "stack" property is a standard that is already included into Error class
  // console.error(err.stack);

  // Delete the uploaded file of files if there is an error
  if (req.fileId) {
    deleteFile(req.fileId);
  }
  if (req.fileIdArr) {
    req.fileIdArr.forEach((fileId) => deleteFile(fileId));
  }

  // Return the size limit error for files
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
