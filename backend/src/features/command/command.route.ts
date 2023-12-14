import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import { validateRules } from "../../middlewares/validateRules";
import {
  command_delete_rules,
  command_get_rules,
  command_post_rules,
  command_put_rules,
} from "./command.rule";
import {
  command_delete_permission,
  command_get_permission,
  command_post_permission,
  command_put_permission,
} from "./command.permission";
import {
  command_delete_controller,
  command_get_controller,
  command_post_controller,
  command_put_controller,
} from "./command.controller";
import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";

const router = Router();

router.use(customJwtAuth);

router.post(
  "",
  command_post_rules,
  validateRules,
  asyncHandler(command_post_permission),
  asyncHandler(command_post_controller)
);
router.get(
  "",
  command_get_rules,
  validateRules,
  asyncHandler(command_get_permission),
  asyncHandler(command_get_controller)
);
router.put(
  "/:idCommand",
  command_put_rules,
  validateRules,
  asyncHandler(command_put_permission),
  asyncHandler(command_put_controller)
);
router.delete(
  "/:idCommand",
  command_delete_rules,
  validateRules,
  asyncHandler(command_delete_permission),
  asyncHandler(command_delete_controller)
);

export default router;
