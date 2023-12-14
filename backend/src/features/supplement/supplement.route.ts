import { Router } from "express";

import {
  supplement_delete_rules,
  supplement_file_delete_rules,
  supplement_files_put_rules,
  supplement_put_rules,
  supplement_get_rules,
  supplement_post_rules,
} from "./supplement.rule";
import { validateRules } from "../../middlewares/validateRules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  supplement_delete_file_permission,
  supplement_delete_permission,
  supplement_put_files_permission,
  supplement_put_permission,
  supplement_post_permission,
} from "./supplement.permission";
import {
  supplement_delete_controller,
  supplement_delete_file_controller,
  supplement_put_controller,
  supplement_put_files_controller,
  supplement_get_controller,
  supplement_post_controller,
} from "./supplement.controller";
import {
  multipleFileMiddleware,
  processMultipleFileUpload,
} from "../../middlewares/fileUpload";
import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";

const supplementRoutes = Router();

supplementRoutes.post(
  "",
  customJwtAuth,
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...supplement_post_rules,
  validateRules,
  asyncHandler(supplement_post_permission),
  asyncHandler(supplement_post_controller)
);
supplementRoutes.get(
  "",
  supplement_get_rules,
  validateRules,
  asyncHandler(supplement_get_controller)
);
supplementRoutes.put(
  "/:idSupplement",
  customJwtAuth,
  ...supplement_put_rules,
  validateRules,
  asyncHandler(supplement_put_permission),
  asyncHandler(supplement_put_controller)
);
supplementRoutes.put(
  "/files/:idSupplement",
  customJwtAuth,
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...supplement_files_put_rules,
  validateRules,
  asyncHandler(supplement_put_files_permission),
  asyncHandler(supplement_put_files_controller)
);
supplementRoutes.delete(
  "/:idSupplement",
  customJwtAuth,
  ...supplement_delete_rules,
  validateRules,
  asyncHandler(supplement_delete_permission),
  asyncHandler(supplement_delete_controller)
);
supplementRoutes.delete(
  "/:idSupplement/file/:idThumbnail",
  customJwtAuth,
  ...supplement_file_delete_rules,
  validateRules,
  asyncHandler(supplement_delete_file_permission),
  asyncHandler(supplement_delete_file_controller)
);

export default supplementRoutes;
