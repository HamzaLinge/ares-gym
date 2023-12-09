import { body, check, param, query } from "express-validator";
import { errorMessageValidator } from "../../../utils/errorMessageValidator";

export const shopping_protein_post_rules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("title"))
    .isString()
    .withMessage(errorMessageValidator.isString("title"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3)),
  body("type")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("type"))
    .isString()
    .withMessage(errorMessageValidator.isString("type")),
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
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("description"))
    .isString()
    .withMessage(errorMessageValidator.isString("description")),
];

export const shopping_protein_get_rules = [
  query("idProtein")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id protein"))
    .custom((value, { req }) => {
      if (value && req.query?.name) {
        throw new Error(
          "Only one of idProtein or name should be provided, not both"
        );
      }
      return true;
    }),
  query("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("name"))
    .isLength({ min: 3 })
    .withMessage(errorMessageValidator.isLengthMin("name", 3))
    .custom((value, { req }) => {
      if (value && req.query?.idProtein) {
        throw new Error(
          "Only one of idProtein or name should be provided, not both"
        );
      }
      return true;
    }),
];

export const shopping_protein_put_rules = [
  param("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id protein")),
  body("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("title")),
  body("type")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.isString("type")),
  body("price")
    .optional({ values: "falsy" })
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
    .withMessage(errorMessageValidator.isString("description")),
];

export const shopping_protein_files_put_rules = [
  param("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id protein")),
  check("files").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error(errorMessageValidator.isFilesUploaded());
    }
    return true;
  }),
];

export const shopping_protein_delete_rules = [
  param("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id protein")),
];
export const shopping_protein_file_delete_rules = [
  param("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id protein")),
  param("idThumbnail")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id thumbnail"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("id thumbnail")),
];
