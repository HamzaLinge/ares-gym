import { ErrorRequestHandler } from "express";

import { CustomError } from "../types/common.types";

const centralizedErrors: ErrorRequestHandler = (
  err: CustomError | Error,
  req,
  res,
  next
) => {
  // The "stack" property is a standard that is already included into Error class
  console.error(err.stack);
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
