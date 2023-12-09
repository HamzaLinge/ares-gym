import { body, check, param, query } from "express-validator";
import { errorMessageValidator } from "../../../utils/errorMessageValidator";

export const shopping_command_post_rules = [
  body("proteins")
    .isArray()
    .withMessage(errorMessageValidator.isArray("proteins")),
  body("proteins.*.data")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Each protein data")),
  body("proteins.*.quantity")
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each protein quantity", 0)),

  body("discount")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isObject("discount")),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Discount data")),

  body("note")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("note")),
];

export const shopping_command_get_rules = [
  query("idCommand")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
  query("confirmed")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("confirmed")),
];

export const shopping_command_put_rules = [
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
    .withMessage(errorMessageValidator.isMongoId("Each protein data")),
  body("proteins.*.quantity")
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each protein quantity", 0)),

  body("discount")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isObject("discount")),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Discount data")),
  body("discount.validated")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("Discount validated")),

  body("status")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isObject("status")),
  body("status.datePayment")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isValidDate("status date payment")),
  body("status.confirmed")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("status confirmed")),

  body("note")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("note")),
];

export const shopping_command_confirm_put_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
];

export const shopping_command_discount_files_put_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),

  check("files").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error(errorMessageValidator.isFilesUploaded());
    }
    return true;
  }),
];

export const shopping_command_delete_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
];

export const shopping_command_discount_file_delete_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
  param("idDiscountFile")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id discount file"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount file")),
];
