import { body, param, query } from "express-validator";
import { errorMessageValidator } from "../../../utils/errorMessageValidator";
import ProteinModel from "../../../models/Protein";

export const shopping_protein_post_rules = [
  body("name")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("title"))
    .isString()
    .withMessage(errorMessageValidator.string("title")),
  body("type")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("type"))
    .isString()
    .withMessage(errorMessageValidator.string("type")),
  body("price")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("price"))
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.int("price", 0)),
  body("stock")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("stock"))
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.int("stock", 0)),
  body("description")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("description"))
    .isString()
    .withMessage(errorMessageValidator.string("description")),
];

export const shopping_protein_get_rules = [
  param("idProtein")
    .optional({ values: "falsy" })
    .isMongoId()
    .withMessage(errorMessageValidator.mongoID("id protein"))
    .custom((value, { req }) => {
      if (value && req.params?.name) {
        throw new Error(
          "Only one of idProtein or name should be provided, not both"
        );
      }
      return true;
    }),
  param("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.string("name"))
    .custom((value, { req }) => {
      if (value && req.params?.idProtein) {
        throw new Error(
          "Only one of idProtein or name should be provided, not both"
        );
      }
      return true;
    }),
];

export const shopping_protein_put_rules = [
  body("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.mongoID("id protein")),
  body("name")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.string("title")),
  body("type")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.string("type")),
  body("price")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.int("price", 0)),
  body("stock")
    .optional({ values: "falsy" })
    .isInt({ min: 0 })
    .withMessage(errorMessageValidator.int("stock", 0)),
  body("description")
    .optional({ values: "falsy" })
    .isString()
    .withMessage(errorMessageValidator.string("description")),
];

export const shopping_protein_delete_rules = [
  query("idProtein")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("id protein"))
    .isMongoId()
    .withMessage(errorMessageValidator.mongoID("id protein")),
];
