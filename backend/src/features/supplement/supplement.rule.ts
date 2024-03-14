import { body, check, param, query } from "express-validator";
import { errorMessageValidator } from "../../utils/error.util";
import { notEmptyString } from "../../utils/string.util";

export const supplement_post_rules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("name"))
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3))
    .toLowerCase(),
  body("category")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("category"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("category")),
  body("price")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("price"))
    .isInt()
    .withMessage(errorMessageValidator.isInt("price"))
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.isIntMin("price", 0)),
  body("stock")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("stock"))
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.isIntMin("stock", 0)),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
];

export const supplement_get_rules = [
  query("idSupplement")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id supplement"))
    .custom((value, { req }) => {
      if (value && req.query && Object.values(req.query).length > 1) {
        throw new Error(
          "Id Complement cannot be supplied with other parameters",
        );
      }
      return true;
    }),
  query("category")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("category")),
  query("minPrice")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("min price")),
  query("maxPrice")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("max price")),
  query("sortBy")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("sort by")),
  query("skip")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("skip")),
  query("limit")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("limit")),
  query("excludeId")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("exclude Id")),
  query("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3)),
  query("price")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("price")),
  query("stock")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("stock")),
  query("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description")),
];

export const supplement_get_search_rules = [
  query("search")
    .isString()
    .withMessage(errorMessageValidator.isString("search"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("search", 3))
    .trim()
    .escape(),
];

export const supplement_put_rules = [
  param("idSupplement")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id supplement"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id supplement")),
  body("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("title"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3)),
  body("category")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("category")),
  body("price")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("price")),
  body("stock")
    .optional({ values: "falsy" })
    .isInt()
    .withMessage(errorMessageValidator.isInt("stock")),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("description"))
    .toLowerCase(),
];

export const supplement_files_put_rules = [
  param("idSupplement")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id supplement"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id supplement")),

  check("files").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error(errorMessageValidator.isFilesUploaded());
    }
    return true;
  }),
];

export const supplement_delete_rules = [
  param("idSupplement")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id supplement"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id supplement")),
];
export const supplement_file_delete_rules = [
  param("idSupplement")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id supplement"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id supplement")),
  param("idThumbnail")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id thumbnail"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id thumbnail")),
];
