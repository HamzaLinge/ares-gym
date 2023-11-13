import { body, param, query } from "express-validator";
import { TargetsDiscount } from "../../types/common.types";

export const discount_post_rules = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .toLowerCase(),
  body("percentage")
    .isNumeric()
    .withMessage("Percentage must be a number")
    .custom((value) => value >= 0 && value <= 100)
    .withMessage("Percentage must be between 0 and 100"),
  body("targets")
    .isArray()
    .withMessage("Targets must be an array")
    .isIn(Object.values(TargetsDiscount))
    .withMessage(
      `Targets must be one of these values: ${Object.values(
        TargetsDiscount
      ).join(", ")}`
    ),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("DateBegin must be a valid date format (ISO 8601)"),
  body("dateEnd")
    .isISO8601()
    .withMessage("DateEnd must be a valid date format (ISO 8601)")
    .custom((value, { req }) => {
      if (
        req.body.dateBegin &&
        new Date(value) <= new Date(req.body.dateBegin)
      ) {
        throw new Error("DateEnd must be after DateBegin");
      }
      return true;
    }),
  body("description")
    .isString()
    .withMessage("Description must be a string")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .toLowerCase(),
];

export const discount_get_rules = [
  query("idDiscount")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idDiscount must be a valid MongoID"),
];

export const discount_put_rules = [
  body("idDiscount")
    .notEmpty()
    .withMessage("idDiscount is required")
    .isMongoId()
    .withMessage("idDiscount must be a valid MongoID"),
  body("title")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .toLowerCase(),
  body("percentage")
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage("Percentage must be a number")
    .custom((value) => value >= 0 && value <= 100)
    .withMessage("Percentage must be between 0 and 100"),
  body("targets")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage("Targets must be an array")
    .isIn(Object.values(TargetsDiscount))
    .withMessage(
      `Targets must be one of these values: ${Object.values(
        TargetsDiscount
      ).join(", ")}`
    ),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("DateBegin must be a valid date format (ISO 8601)"),
  body("dateEnd")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("DateEnd must be a valid date format (ISO 8601)")
    .custom((value, { req }) => {
      if (
        req.body.dateBegin &&
        new Date(value) <= new Date(req.body.dateBegin)
      ) {
        throw new Error("DateEnd must be after DateBegin");
      }
      return true;
    }),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required")
    .toLowerCase(),
];

export const discount_delete_rules = [
  param("idDiscount")
    .isMongoId()
    .withMessage("idDiscount must be a valid MongoID"),
];
