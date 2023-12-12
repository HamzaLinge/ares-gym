import { body, check, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/errorMessageValidator";
import { dateEndExceedsDateBegin } from "../../utils/date.util";

export const discount_post_rules = [
  body("title")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("title"))
    .isString()
    .withMessage(errorMessageValidator.isString("title")),

  body("percentage")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("percentage"))
    .isNumeric()
    .withMessage(errorMessageValidator.isNumeric("percentage"))
    .custom((value: number) => value >= 1 && value <= 100)
    .withMessage(errorMessageValidator.isRange("percentage", 1, 100)),

  body("dateBegin")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("date begin"))
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date begin")),

  body("dateEnd")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("date end"))
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date end"))
    .custom((value, { req }) => {
      if (!req.body.dateBegin) {
        throw new Error(
          "Date Begin is not provided to compare it with Date End"
        );
      }
      if (!dateEndExceedsDateBegin(req.body.dateBegin, value)) {
        throw new Error("Date End must exceed Date Begin by at least one day");
      }
      return true;
    }),
  body("validationRequire")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("validation require")),

  body("description")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("description"))
    .isString()
    .withMessage(errorMessageValidator.isString("description")),
];

export const discount_get_rules = [
  query("idDiscount")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount"))
    .custom((value, { req }) => {
      if (value && req.query?.idDiscount) {
        throw new Error(
          "Only one of Id Discount or Title should be provided, not both"
        );
      }
      return true;
    }),
  query("title")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("title"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("title", 3))
    .custom((value, { req }) => {
      if (value && req.query?.idDiscount) {
        throw new Error(
          "Only one of Id Discount or Title should be provided, not both"
        );
      }
      return true;
    }),
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
    .custom((value: number) => value >= 1 && value <= 100)
    .withMessage(errorMessageValidator.isRange("percentage", 1, 100)),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date begin")),
  body("dateEnd")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date end"))
    .custom((value, { req }) => {
      if (!req.body.dateBegin) {
        return true;
      }
      if (!dateEndExceedsDateBegin(req.body.dateBegin, value)) {
        throw new Error("Date End must exceed Date Begin by at least one day");
      }
      return true;
    }),
  body("validationRequire")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("validation require")),
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
