import { body, query } from "express-validator";

export const weightlifting_asset_create_rules = [
  body("title")
    .notEmpty()
    .withMessage("You need to provide a title")
    .isString()
    .withMessage("Title need to be a string type"),
  body("icon")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Type icon is incorrect"),
];

export const weightlifting_asset_get_rules = [
  query("idAsset")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idAsset must be a valid MongoDB ObjectId"),
];
