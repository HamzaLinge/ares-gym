import { body, param, query } from "express-validator";
import WeightliftingPlanModel from "../../../models/WeightliftingPlan";
import DiscountModel from "../../../models/Discount";
import SubscriptionModel from "../../../models/Subscription";
import { errorMessageValidator } from "../../../utils/errorMessageValidator";

export const weightlifting_subscription_post_rules = [
  body("user")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("user"))
    .custom((idUser) => {
      return SubscriptionModel.findById(idUser).then((user) => {
        if (!user) {
          return Promise.reject(errorMessageValidator.docNotFound("user"));
        }
      });
    }),
  body("weightliftingPlan")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("weightlifting plan"))
    .custom((idWeightliftingPlan) => {
      return WeightliftingPlanModel.findById(idWeightliftingPlan).then(
        (weightliftingPlan) => {
          if (!weightliftingPlan) {
            return Promise.reject(
              errorMessageValidator.docNotFound("weightlifting plan")
            );
          }
        }
      );
    }),
  body("dateBegin")
    .isISO8601()
    .withMessage(errorMessageValidator.isValidDate("date begin")),
  body("monthNumber")
    .isInt({ min: 1, max: 12 })
    .withMessage(errorMessageValidator.isRange("month number", 1, 12)),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount")),
];

export const weightlifting_subscription_get_rules = [
  query("idUser")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idUser must be a valid MongoID"),
  query("idSubscription")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idSubscription must be a valid MongoID"),
];

export const weightlifting_subscription_get_subscriber_rules = [
  query("idSubscription")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id subscription"))
    .custom((idSubscription) => {
      return SubscriptionModel.findOne({ _id: idSubscription }).then(
        (subscription) => {
          if (!subscription) {
            return Promise.reject(
              errorMessageValidator.docNotFound("subscription")
            );
          }
        }
      );
    }),
  query("validatedDiscount")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("validated discount")),
  query("confirmedSubscription")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("confirmed status")),
];

export const weightlifting_subscription_get_admin_rules = [
  query("idUser")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id user"))
    .custom((idUser) => {
      return SubscriptionModel.findById(idUser).then((user) => {
        if (!user) {
          return Promise.reject(errorMessageValidator.docNotFound("user"));
        }
      });
    }),
  query("idSubscription")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id subscription"))
    .custom((idSubscription) => {
      return SubscriptionModel.findOne({ _id: idSubscription }).then(
        (subscription) => {
          if (!subscription) {
            return Promise.reject(
              errorMessageValidator.docNotFound("subscription")
            );
          }
        }
      );
    }),
  query("validatedDiscount")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("validated discount")),
  query("confirmedSubscription")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("confirmed status")),
];

export const weightlifting_subscription_put_subscriber_rules = [
  body("idSubscription")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id subscription"))
    .custom((idSubscription) => {
      return SubscriptionModel.findOne({ _id: idSubscription }).then(
        (subscription) => {
          if (!subscription) {
            return Promise.reject(
              errorMessageValidator.docNotFound("subscription")
            );
          }
        }
      );
    }),
  body("weightliftingPlan")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("weightlifting plan"))
    .custom((idWeightliftingPlan) => {
      return WeightliftingPlanModel.findById(idWeightliftingPlan).then(
        (weightliftingPlan) => {
          if (!weightliftingPlan) {
            return Promise.reject(
              errorMessageValidator.docNotFound("weightlifting plan")
            );
          }
        }
      );
    }),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isValidDate("date begin")),
  body("monthNumber")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: 12 })
    .withMessage(errorMessageValidator.isRange("month number", 1, 12)),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount"))
    .custom((idDiscount) => {
      return DiscountModel.findById(idDiscount).then((discount) => {
        if (!discount) {
          return Promise.reject(errorMessageValidator.docNotFound("discount"));
        }
      });
    }),
];

export const weightlifting_subscription_put_admin_rules = [
  body("idUser")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id user"))
    .custom((idUser) => {
      return SubscriptionModel.findById(idUser).then((user) => {
        if (!user) {
          return Promise.reject(errorMessageValidator.docNotFound("user"));
        }
      });
    }),
  body("idSubscription")
    .isMongoId()
    .withMessage("ID Subscription must be a valid MongoDB ObjectId")
    .custom((idSubscription) => {
      return SubscriptionModel.findById(idSubscription).then((subscription) => {
        if (!subscription) {
          return Promise.reject(
            errorMessageValidator.docNotFound("subscription")
          );
        }
      });
    }),
  body("weightliftingPlan")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("weightlifting plan"))
    .custom((idWeightliftingPlan) => {
      return WeightliftingPlanModel.findById(idWeightliftingPlan).then(
        (weightliftingPlan) => {
          if (!weightliftingPlan) {
            return Promise.reject(
              errorMessageValidator.docNotFound("weightlifting plan")
            );
          }
        }
      );
    }),
  body("dateBegin")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(errorMessageValidator.isValidDate("date begin")),
  body("monthNumber")
    .optional({ values: "falsy" })
    .isInt({ min: 1, max: 12 })
    .withMessage(errorMessageValidator.isRange("Month Number", 1, 12)),
  body("discount.data")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id discount"))
    .custom((idDiscount) => {
      return DiscountModel.findById(idDiscount).then((discount) => {
        if (!discount) {
          return Promise.reject(errorMessageValidator.docNotFound("discount"));
        }
      });
    }),
  body("discount.validated")
    .optional({ values: "falsy" })
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("validated discount")),
  body("status.confirmed")
    .isBoolean()
    .withMessage(errorMessageValidator.isBool("confirmed status")),
];

export const weightlifting_subscription_delete_rules = [
  param("idSubscription")
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id subscription"))
    .custom((idSubscription) => {
      return SubscriptionModel.findById(idSubscription).then((subscription) => {
        if (!subscription) {
          return Promise.reject(
            errorMessageValidator.docNotFound("subscription")
          );
        }
      });
    }),
];
