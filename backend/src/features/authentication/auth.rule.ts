import { body } from "express-validator";

import { GendersUser, Roles } from "./auth.type";
import { errorMessageValidator } from "../../utils/error.util";

export const auth_checkEmailAvailability_rules = [
  body("email")
    .isEmail()
    .withMessage(errorMessageValidator.isEmail("email"))
    .toLowerCase(),
];

export const auth_local_login_rules = [
  body("email")
    .isEmail()
    .withMessage(errorMessageValidator.isEmail("email"))
    .toLowerCase(),
  body("password")
    .isString()
    .withMessage(errorMessageValidator.isString("password"))
    .isLength({ min: 6 })
    .withMessage(errorMessageValidator.isLengthMin("password", 6)),
];

export const auth_local_register_rules = [
  body("email")
    .isEmail()
    .withMessage(errorMessageValidator.isEmail("email"))
    .toLowerCase(),

  body("password")
    .isString()
    .withMessage(errorMessageValidator.isString("password"))
    .isLength({ min: 6 })
    .withMessage(errorMessageValidator.isLengthMin("password", 6))
    .matches(/\d/)
    .withMessage(errorMessageValidator.mustContainsNumber("password"))
    .not()
    .isIn(["123456", "password", "qwerty", "azerty"])
    .withMessage(errorMessageValidator.notCommonWord("password"))
    .not()
    .matches(/\s/)
    .withMessage(errorMessageValidator.mustNotContainsSpaces("password")),

  body("passwordConfirmation")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("password confirmation"))
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error(
          errorMessageValidator.notMatchString(
            "password confirmation",
            "password"
          )
        );
      }
      return true;
    }),

  body("firstName")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("first name"))
    .isString()
    .withMessage(errorMessageValidator.isString("first name"))
    .toLowerCase(),

  body("lastName")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("last name"))
    .isString()
    .withMessage(errorMessageValidator.isString("last name"))
    .toLowerCase(),
];
