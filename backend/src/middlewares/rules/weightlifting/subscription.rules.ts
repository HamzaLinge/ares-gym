import { body } from "express-validator";

export const weightlifting_subscription_post_rules = [
  body("user")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("User must be a valid MongoID"),
  body("weightliftingPlan")
    .isMongoId()
    .withMessage("WeightliftingPlan must be a valid MongoDB ObjectId"),
  body("dateBegin").isISO8601().withMessage("dateBegin must be a valid date"),
  body("monthNumber")
    .isInt({ min: 1, max: 12 })
    .withMessage("monthNumber must be a number between 1 and 12"),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("Discount must be a valid ObjectId"),
];
