import { body } from "express-validator";
import { GendersWeightliftingPlan } from "../../../types/common.types";

export const weightlifting_plan_post_rules = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),
  body("price")
    .isFloat({ gt: 250 })
    .withMessage("Price must be a positive number"),
  body("gender")
    .isIn(Object.values(GendersWeightliftingPlan))
    .withMessage("Invalid gender specified"),
  body("sessionPerWeek")
    .isInt({ min: 1 })
    .withMessage("Sessions per week must be an integer greater than 0"),
  body("assets")
    .isArray()
    .withMessage("Assets must be an array")
    .custom((assets: string[]) =>
      assets.every((asset) => typeof asset === "string")
    )
    .withMessage("Each asset must be a string"),
];
