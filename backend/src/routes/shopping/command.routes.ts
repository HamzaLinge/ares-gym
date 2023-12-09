import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import { validate } from "../../middlewares/rules/validate";
import {
  shopping_command_confirm_put_rules,
  shopping_command_delete_rules,
  shopping_command_discount_file_delete_rules,
  shopping_command_discount_files_put_rules,
  shopping_command_get_rules,
  shopping_command_post_rules,
  shopping_command_put_rules,
} from "../../middlewares/rules/shopping/command.rules";
import {
  shopping_command_confirm_put_permission,
  shopping_command_delete_permission,
  shopping_command_discount_file_delete_permission,
  shopping_command_discount_files_put_permission,
  shopping_command_get_permission,
  shopping_command_post_permission,
  shopping_command_put_permission,
} from "../../middlewares/permissions/shopping/command.permissions";
import {
  shopping_command_confirm_put_controller,
  shopping_command_delete_controller,
  shopping_command_discount_file_delete_controller,
  shopping_command_discount_files_put_controller,
  shopping_command_get_controller,
  shopping_command_post_controller,
  shopping_command_put_controller,
} from "../../controllers/shopping/command.controllers";
import {
  multipleFileMiddleware,
  processMultipleFileUpload,
} from "../../middlewares/fileUpload";

const router = Router();

router.post(
  "",
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...shopping_command_post_rules,
  validate,
  asyncHandler(shopping_command_post_permission),
  asyncHandler(shopping_command_post_controller)
);
router.get(
  "",
  shopping_command_get_rules,
  validate,
  asyncHandler(shopping_command_get_permission),
  asyncHandler(shopping_command_get_controller)
);
router.put(
  "/:idCommand",
  shopping_command_put_rules,
  validate,
  asyncHandler(shopping_command_put_permission),
  asyncHandler(shopping_command_put_controller)
);
router.put(
  "/confirm/:idCommand",
  shopping_command_confirm_put_rules,
  validate,
  asyncHandler(shopping_command_confirm_put_permission),
  asyncHandler(shopping_command_confirm_put_controller)
);
router.put(
  "/discount/files/:idCommand",
  multipleFileMiddleware,
  processMultipleFileUpload,
  ...shopping_command_discount_files_put_rules,
  validate,
  asyncHandler(shopping_command_discount_files_put_permission),
  asyncHandler(shopping_command_discount_files_put_controller)
);
router.delete(
  "/:idCommand",
  shopping_command_delete_rules,
  validate,
  asyncHandler(shopping_command_delete_permission),
  asyncHandler(shopping_command_delete_controller)
);
router.delete(
  "/discount/file/:idCommand/:idDiscountFile",
  shopping_command_discount_file_delete_rules,
  validate,
  asyncHandler(shopping_command_discount_file_delete_permission),
  asyncHandler(shopping_command_discount_file_delete_controller)
);

export default router;
