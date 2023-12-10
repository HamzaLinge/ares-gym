import { body, check, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/errorMessageValidator";

export const discount_post_rules = [
  body("title")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("title"))
    .isString()
    .withMessage(errorMessageValidator.isString("title"))
    .toLowerCase(),

  body("percentage")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("percentage"))
    .isNumeric()
    .withMessage(errorMessageValidator.isNumeric("percentage"))
    .custom((value: number) => value >= 0 && value <= 100)
    .withMessage(errorMessageValidator.isRange("percentage", 0, 100)),

  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date begin")),

  body("dateEnd")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("date end"))
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date end"))
    .custom((value, { req }) => {
      if (
        req.body.dateBegin &&
        new Date(value) <= new Date(req.body.dateBegin)
      ) {
        throw new Error("Date End must be after Date Begin");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("description"))
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
];

export const discount_get_rules = [
  query("idDiscount")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),
];

export const discount_put_rules = [
  param("idDiscount")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id discount"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),

  body("title")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("title"))
    .toLowerCase(),
  body("percentage")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage(errorMessageValidator.isNumeric("percentage"))
    .custom((value) => value >= 0 && value <= 100)
    .withMessage(errorMessageValidator.isRange("percentage", 0, 100)),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date begin")),
  body("dateEnd")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date end"))
    .custom((value, { req }) => {
      if (
        req.body.dateBegin &&
        new Date(value) <= new Date(req.body.dateBegin)
      ) {
        throw new Error("Date End must be after Date Begin");
      }
      return true;
    }),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
];

export const discount_file_put_rules = [
  param("idDiscount")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id discount"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),
  check("file").custom((value, { req }) => {
    if (!req.file) {
      throw new Error(errorMessageValidator.isFileUploaded());
    }
    return true;
  }),
];

export const discount_delete_rules = [
  param("idDiscount")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id discount"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),
];

export const discount_file_delete_rules = [
  param("idDiscount")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id discount"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),
];
