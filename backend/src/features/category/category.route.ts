import { Router } from "express";

import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";
import {
  category_delete_rules,
  category_get_rules,
  category_post_rules,
  category_put_rules,
} from "./category.rule";
import { validateRules } from "../../middlewares/validateRules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  category_delete_permission,
  category_post_permission,
  category_put_permission,
} from "./category.permission";
import {
  category_delete_controller,
  category_get_controller,
  category_post_controller,
  category_put_controller,
} from "./category.controller";

const categoryRoutes = Router();

categoryRoutes.post(
  "",
  customJwtAuth,
  ...category_post_rules,
  validateRules,
  asyncHandler(category_post_permission),
  asyncHandler(category_post_controller)
);
categoryRoutes.get(
  "",
  category_get_rules,
  validateRules,
  asyncHandler(category_get_controller)
);
categoryRoutes.put(
  "/:idCategory",
  customJwtAuth,
  ...category_put_rules,
  validateRules,
  asyncHandler(category_put_permission),
  asyncHandler(category_put_controller)
);
categoryRoutes.delete(
  "/:idCategory",
  customJwtAuth,
  ...category_delete_rules,
  validateRules,
  asyncHandler(category_delete_permission),
  asyncHandler(category_delete_controller)
);

export default categoryRoutes;
