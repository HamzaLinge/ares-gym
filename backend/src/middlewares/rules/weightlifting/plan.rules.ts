import mongoose from "mongoose";
import { body, query, param } from "express-validator";

import { GendersWeightliftingPlan } from "../../../types/common.types";

export const weightlifting_plan_post_rules = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .toLowerCase(),
  body("price")
    .isFloat({ gt: 250 })
    .withMessage("Price must be a positive number"),
  body("gender")
    .isIn(Object.values(GendersWeightliftingPlan))
    .withMessage("Invalid gender specified"),
  body("sessionsPerWeek")
    .isInt({ min: 1 })
    .withMessage("Sessions per week must be an integer greater than 0"),
  body("assets")
    .isArray()
    .withMessage("Assets must be an array")
    .custom((assets) => {
      if (
        assets.some((asset: string) => !mongoose.Types.ObjectId.isValid(asset))
      ) {
        throw new Error("Each asset must be a valid ObjectId");
      }
      return true;
    }),
];

export const weightlifting_plan_get_rules = [
  query("idWeightliftingPlan")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idWeightliftingPlan must be a valid MongoDB ObjectId"),
];

export const weightlifting_plan_put_rules = [
  query("idWeightliftingPlan")
    .isMongoId()
    .withMessage("idWeightliftingPlan must be a valid MongoDB ObjectId"),
  body("title")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Title must be a string")
    .toLowerCase(),
  body("price")
    .optional({ values: "falsy" })
    .isFloat({ gt: 250 })
    .withMessage("Price must be a positive number"),
  body("gender")
    .optional({ values: "falsy" })
    .isIn(Object.values(GendersWeightliftingPlan))
    .withMessage("Invalid gender specified"),
  body("sessionsPerWeek")
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage("Sessions per week must be an integer greater than 0"),
  body("assets")
    .optional({ values: "falsy" })
    .isArray()
    .withMessage("Assets must be an array")
    .custom((assets) => {
      if (
        assets.some((asset: string) => !mongoose.Types.ObjectId.isValid(asset))
      ) {
        throw new Error("Each asset must be a valid ObjectId");
      }
      return true;
    }),
];

export const weightlifting_plan_delete_rules = [
  param("idWeightliftingPlan")
    .isMongoId()
    .withMessage("idWeightliftingPlan must be a valid MongoDB ObjectId"),
];
