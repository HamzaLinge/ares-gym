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
import { jwtAuthMiddleware } from "../../middlewares/auth/jwt/jwtAuthMiddleware";

const commandRoutes = Router();

// commandRoutes.use(jwtAuthMiddleware);

commandRoutes.post(
  "",
  command_post_rules,
  validateRules,
  asyncHandler(command_post_permission),
  asyncHandler(command_post_controller),
);
commandRoutes.get(
  "",
  jwtAuthMiddleware,
  command_get_rules,
  validateRules,
  asyncHandler(command_get_permission),
  asyncHandler(command_get_controller),
);
commandRoutes.put(
  "/:idCommand",
  jwtAuthMiddleware,
  command_put_rules,
  validateRules,
  asyncHandler(command_put_permission),
  asyncHandler(command_put_controller),
);
commandRoutes.delete(
  "/:idCommand",
  command_delete_rules,
  validateRules,
  asyncHandler(command_delete_permission),
  asyncHandler(command_delete_controller),
);

export default commandRoutes;
