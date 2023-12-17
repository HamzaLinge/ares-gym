import { Router } from "express";

import { file_get_rule } from "./file.rule";
import { validateRules } from "../../middlewares/validateRules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { file_get_controller } from "./file.controller";
import { jwtAuthConfig } from "../../middlewares/auth/jwt/jwtAuthConfig";
import { jwtAuthMiddleware } from "../../middlewares/auth/jwt/jwtAuthMiddleware";
import {
  processSingleFileUpload,
  singleFileMiddleware,
} from "../../middlewares/fileUpload";
import { HttpStatusCodes } from "../../utils/error.util";
import { CustomError } from "../../types/global.type";

const fileRoutes = Router();

fileRoutes.post(
  "",
  jwtAuthMiddleware,
  singleFileMiddleware,
  processSingleFileUpload,
  asyncHandler(async (req, res, next) => {
    if (!req.fileId) {
      return next(new CustomError("File Id not found", 404));
    }
    res.status(HttpStatusCodes.OK).send({ fileId: req.fileId });
  })
);

fileRoutes.get(
  "/:fileId",
  file_get_rule,
  validateRules,
  asyncHandler(file_get_controller)
);

export default fileRoutes;
