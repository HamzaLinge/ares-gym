import { body, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/errorMessageValidator";

export const command_post_rules = [
  body("proteins")
    .isArray()
    .withMessage(errorMessageValidator.isArray("proteins")),
  body("proteins.*.data")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Each supplement data")),
  body("proteins.*.quantity")
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each supplement quantity", 0)),

  body("discount")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("discount")),

  body("note")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("note")),
];

export const command_get_rules = [
  query("idCommand")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
  query("confirmed")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("confirmed")),
];

export const command_put_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id Command")),

  body("proteins")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage(errorMessageValidator.isArray("proteins")),
  body("proteins.*.data")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Each supplement data")),
  body("proteins.*.quantity")
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each supplement quantity", 0)),

  body("discount")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isMongoId("discount")),

  body("status")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isObject("status")),
  body("status.datePayment")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("status date payment")),
  body("status.confirmed")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("status confirmed")),

  body("note")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("note")),
];

export const command_delete_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
];
