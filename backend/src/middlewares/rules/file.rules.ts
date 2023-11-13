import { param } from "express-validator";

export const file_get_rules = [
  param("idFile")
    .notEmpty()
    .withMessage("idFile is required")
    .isString()
    .withMessage("idFile must be a string"),
];
