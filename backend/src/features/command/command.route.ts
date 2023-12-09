import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import { validateRules } from "../../middlewares/validateRules";
import {
  shopping_command_confirm_put_rules,
  shopping_command_delete_rules,
  shopping_command_discount_file_delete_rules,
  shopping_command_discount_files_put_rules,
  shopping_command_get_rules,
  shopping_command_post_rules,
  shopping_command_put_rules,
} from "./command.rule";
import {
  shopping_command_confirm_put_permission,
  shopping_command_delete_permission,
  shopping_command_discount_file_delete_permission,
  shopping_command_discount_files_put_permission,
  shopping_command_get_permission,
  shopping_command_post_permission,
  shopping_command_put_permission,
} from "./command.permission";
import {
  shopping_command_confirm_put_controller,
  shopping_command_delete_controller,
  shopping_command_discount_file_delete_controller,
  shopping_command_discount_files_put_controller,
  shopping_command_get_controller,
  shopping_command_post_controller,
  shopping_command_put_controller,
} from "./command.controller";
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
  ...shopping_command_post_rules,
  validateRules,
  asyncHandler(shopping_command_post_permission),
  asyncHandler(shopping_command_post_controller)
);
router.get(
  "",
  shopping_command_get_rules,
  validateRules,
  asyncHandler(shopping_command_get_permission),
  asyncHandler(shopping_command_get_controller)
);
router.put(
  "/:idCommand",
  shopping_command_put_rules,
  validateRules,
  asyncHandler(shopping_command_put_permission),
  asyncHandler(shopping_command_put_controller)
);
router.put(
  "/confirm/:idCommand",
  shopping_command_confirm_put_rules,
  validateRules,
  asyncHandler(shopping_command_confirm_put_permission),
  asyncHandler(shopping_command_confirm_put_controller)
);
router.put(
  "/discount/files/:idCommand",
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...shopping_command_discount_files_put_rules,
  validateRules,
  asyncHandler(shopping_command_discount_files_put_permission),
  asyncHandler(shopping_command_discount_files_put_controller)
);
router.delete(
  "/:idCommand",
  shopping_command_delete_rules,
  validateRules,
  asyncHandler(shopping_command_delete_permission),
  asyncHandler(shopping_command_delete_controller)
);
router.delete(
  "/discount/file/:idCommand/:idDiscountFile",
  shopping_command_discount_file_delete_rules,
  validateRules,
  asyncHandler(shopping_command_discount_file_delete_permission),
  asyncHandler(shopping_command_discount_file_delete_controller)
);

export default router;
