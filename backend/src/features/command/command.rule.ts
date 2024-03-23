import { body, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/error.util";
import { CommandStatus } from "../../models/Command";
import { PaymentMethod } from "../../models/Payment";

export const command_post_rules = [
  body("supplements")
    .isArray()
    .withMessage(errorMessageValidator.isArray("supplements")),
  body("supplements.*.data")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Each supplement data")),
  body("supplements.*.quantity")
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each supplement quantity", 0)),

  body("shipping.firstName")
    .isString()
    .withMessage(errorMessageValidator.isString("shipping first name")),
  body("shipping.lastName")
    .isString()
    .withMessage(errorMessageValidator.isString("shipping last name")),
  body("shipping.phoneNumber")
    .isString()
    .withMessage(errorMessageValidator.isString("shipping phone number")),
  body("shipping.wilaya")
    .isString()
    .withMessage(errorMessageValidator.isString("shipping wilaya")),
  body("shipping.address")
    .isString()
    .withMessage(errorMessageValidator.isString("shipping address")),

  body("payment.method")
    .isString()
    .withMessage(errorMessageValidator.isString("payment method"))
    .isIn(Object.values(PaymentMethod))
    .withMessage(
      errorMessageValidator.isIn(
        "payment method",
        Object.values(PaymentMethod),
      ),
    ),

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
];

export const command_put_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id Command")),

  body("supplements")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage(errorMessageValidator.isArray("supplements")),
  body("supplements.*.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("Each supplement data")),
  body("supplements.*.quantity")
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage(errorMessageValidator.isIntMin("Each supplement quantity", 0)),

  body("discount")
    .optional({ values: "falsy" })
    .isObject()
    .withMessage(errorMessageValidator.isMongoId("discount")),

  body("status")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("status"))
    .isIn(Object.values(CommandStatus))
    .withMessage(errorMessageValidator.invalidValue("status")),
  body("shippedAddress")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("shipping address")),
  body("dateShipped")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date shipped")),
  body("dateDelivered")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isDate("date delivered")),

  body("note")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("note"))
    .toLowerCase(),
];

export const command_delete_rules = [
  param("idCommand")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id command"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id command")),
];
