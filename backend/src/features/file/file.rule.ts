import { param } from "express-validator";

import { errorMessageValidator } from "../../utils/error.util";

export const file_get_rule = [
  param("fileId")
    .notEmpty()
    .withMessage(errorMessageValidator.notEmpty("file id"))
    .isMongoId()
    .withMessage(errorMessageValidator.isMongoId("file id")),
];
