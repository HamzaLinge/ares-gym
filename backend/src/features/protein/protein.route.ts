import { Router } from "express";

import {
  shopping_protein_file_delete_rules,
  shopping_protein_delete_rules,
  shopping_protein_get_rules,
  shopping_protein_post_rules,
  shopping_protein_files_put_rules,
  shopping_protein_put_rules,
} from "./protein.rule";
import { validateRules } from "../../middlewares/validateRules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  shopping_protein_delete_file_permission,
  shopping_protein_delete_permission,
  shopping_protein_get_permission,
  shopping_protein_post_permission,
  shopping_protein_put_files_permission,
  shopping_protein_put_permission,
} from "./protein.permission";
import {
  shopping_protein_delete_controller,
  shopping_protein_delete_file_controller,
  shopping_protein_get_controller,
  shopping_protein_post_controller,
  shopping_protein_put_controller,
  shopping_protein_put_files_controller,
} from "./protein.controller";
import {
  multipleFileMiddleware,
  processMultipleFileUpload,
} from "../../middlewares/fileUpload";
import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";

const router = Router();

router.use(customJwtAuth);

router.post(
  "",
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...shopping_protein_post_rules,
  validateRules,
  asyncHandler(shopping_protein_post_permission),
  asyncHandler(shopping_protein_post_controller)
);
router.get(
  "",
  shopping_protein_get_rules,
  validateRules,
  asyncHandler(shopping_protein_get_permission),
  asyncHandler(shopping_protein_get_controller)
);
router.put(
  "/:idProtein",
  shopping_protein_put_rules,
  validateRules,
  asyncHandler(shopping_protein_put_permission),
  asyncHandler(shopping_protein_put_controller)
);
router.put(
  "/files/:idProtein",
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...shopping_protein_files_put_rules,
  validateRules,
  asyncHandler(shopping_protein_put_files_permission),
  asyncHandler(shopping_protein_put_files_controller)
);
router.delete(
  "/:idProtein",
  shopping_protein_delete_rules,
  validateRules,
  asyncHandler(shopping_protein_delete_permission),
  asyncHandler(shopping_protein_delete_controller)
);
router.delete(
  "/file/:idProtein/:idThumbnail",
  shopping_protein_file_delete_rules,
  validateRules,
  asyncHandler(shopping_protein_delete_file_permission),
  asyncHandler(shopping_protein_delete_file_controller)
);

export default router;
