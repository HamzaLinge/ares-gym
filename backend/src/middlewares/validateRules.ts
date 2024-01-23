import { NextFunction, Request, Response } from "express";
import { ResultFactory, validationResult } from "express-validator";

import { CustomError, TErrorValidation } from "../types/global.type";
import { HttpStatusCodes } from "../utils/error.util";

const myValidationResult: ResultFactory<TErrorValidation> =
  validationResult.withDefaults({
    formatter: (error) => {
      switch (error.type) {
        case "field":
          let errorObj: TErrorValidation = {};
          errorObj[error.path] = error.msg as string;
          return errorObj;
        // case "alternative":
        //   console.log(error.nestedErrors);
        //   break;
        // case "alternative_grouped":
        //   // `error` is a `GroupedAlternativeValidationError`
        //   error.nestedErrors.forEach((nestedErrors, i) => {
        //     console.log(`Errors from chain ${i}:`);
        //     console.log(nestedErrors);
        //   });
        //   break;
        // case "unknown_fields":
        //   // `error` is an `UnknownFieldsError`
        //   console.log(error.fields);
        //   break;
        default:
          // Error is not any of the known types! Do something else.
          throw new Error(`Unknown error type ${error}`);
      }
    },
  });

export const validateRules = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    const arrErrors = errors.array();
    const combinedObject = arrErrors.reduce((accumulator, currentObject) => {
      return { ...accumulator, ...currentObject };
    }, {});
    next(
      new CustomError(
        "Error validation fields",
        HttpStatusCodes.BAD_REQUEST,
        combinedObject
      )
    );
  } else {
    // console.log("Validation Success ------------");
    next();
  }
};
