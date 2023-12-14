import { body, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/errorMessageValidator";

export const category_post_rules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("name"))
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3))
    .toLowerCase(),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
  body("parent")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("parent")),
];

export const category_get_rules = [
  query("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3)),
];

export const category_put_rules = [
  param("idCategory")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id category"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id category")),
  body("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3))
    .toLowerCase(),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
  body("parent")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("parent")),
];

export const category_delete_rules = [
  param("idCategory")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id category"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id category")),
];
