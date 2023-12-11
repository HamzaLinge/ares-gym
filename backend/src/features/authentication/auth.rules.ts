import { body } from "express-validator";
import { GendersUser, Roles } from "../../types/common.type";

export const rules_check_email = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail({ all_lowercase: true }),
];

export const rules_register = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail({ all_lowercase: true }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    // Use .not().isIn([...]) to disallow common passwords
    .not()
    .isIn(["123456", "password", "qwerty"])
    .withMessage("Do not use a common word as the password")
    // Custom validation for no spaces
    .not()
    .matches(/\s/)
    .withMessage("Password must not contain spaces"),

  body("confirmPassword")
    .notEmpty()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  body("role")
    .optional({ values: "falsy" })
    .custom((enteredRole) => {
      if (!Object.values(Roles).includes(enteredRole))
        throw new Error("Role does not match any accepted roles");
      return true;
    }),
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("phoneNumber")
    .matches(/^(00213|\+213|0)(5|6|7)[0-9]{6}$/)
    .withMessage("Must be a valid Algerian phone number"),

  body("gender")
    .isString()
    .withMessage("Gender must be a string")
    .toLowerCase()
    .custom((enteredGender) => {
      if (!Object.values(GendersUser).includes(enteredGender))
        throw new Error("Role does not match any accepted roles");
      return true;
    }),

  body("birthday")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate()
    .withMessage("Birthday must be a valid date"),

  body("picture")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Picture must be a string"),
];

export const rules_login = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
