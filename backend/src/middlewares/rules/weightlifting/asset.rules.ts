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
  query("idWeightliftingAsset")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idWeightliftingAsset must be a valid MongoDB ObjectId"),
];

export const weightlifting_asset_put_rules = [
  body("idWeightliftingAsset")
    .isMongoId()
    .withMessage("idWeightliftingAsset must be a valid MongoDB ObjectId"),
  body("title")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Title need to be a string type"),
  body("icon")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Type icon is incorrect"),
];

export const weightlifting_asset_delete_rules = [
  query("idWeightliftingAsset")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage("idWeightliftingAsset must be a valid MongoDB ObjectId"),
];
