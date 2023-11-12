import { body } from "express-validator";

export const weightlifting_subscription_rules_create = [
  body("idUser")
    .isMongoId()
    .withMessage("idUser must be a valid MongoDB ObjectId"),
  body("idWeightliftingPlan")
    .isMongoId()
    .withMessage("idWeightliftingPlan must be a valid MongoDB ObjectId"),
  body("monthNumber")
    .isInt({ min: 1, max: 12 })
    .withMessage("monthNumber must be a number between 1 and 12"),
  body("dateBegin").isISO8601().withMessage("dateBegin must be a valid date"),
  // Optional field
  body("discount.idDiscount")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idDiscount must be a valid MongoDB ObjectId"),
  body("discount.scan")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("scan must be a string url"),
  body("status.confirmed")
    .exists()
    .isBoolean()
    .withMessage("confirmed must be a boolean"),
  body("status.datePayment")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("datePayment must be a valid date"),
];

export const weightlifting_subscription_rules_cancel = [
  body("idSubscription")
    .isMongoId()
    .withMessage("idSubscription must be a valid MongoDB ObjectId"),
];
