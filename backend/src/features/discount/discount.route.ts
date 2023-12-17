import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  discount_delete_permission,
  discount_file_delete_permission,
  discount_file_put_permission,
  discount_get_permission,
  discount_post_permission,
  discount_put_permission,
} from "./discount.permission";
import {
  discount_delete_rules,
  discount_file_delete_rules,
  discount_file_put_rules,
  discount_get_rules,
  discount_post_rules,
  discount_put_rules,
} from "./discount.rule";
import { validateRules } from "../../middlewares/validateRules";
import {
  discount_delete_controller,
  discount_file_delete_controller,
  discount_file_put_controller,
  discount_get_controller,
  discount_post_controller,
  discount_put_controller,
} from "./discount.controller";
import { jwtAuthMiddleware } from "../../middlewares/auth/jwt/jwtAuthMiddleware";
import {
  singleFileMiddleware,
  processSingleFileUpload,
} from "../../middlewares/fileUpload";

const discountRoutes = Router();

discountRoutes.use(jwtAuthMiddleware);

discountRoutes.post(
  "",
  singleFileMiddleware,
  processSingleFileUpload,
  ...discount_post_rules,
  validateRules,
  asyncHandler(discount_post_permission),
  asyncHandler(discount_post_controller)
);
discountRoutes.get(
  "",
  discount_get_rules,
  validateRules,
  asyncHandler(discount_get_permission),
  asyncHandler(discount_get_controller)
);
discountRoutes.put(
  "/:idDiscount",
  ...discount_put_rules,
  validateRules,
  asyncHandler(discount_put_permission),
  asyncHandler(discount_put_controller)
);
discountRoutes.put(
  "/file/:idDiscount",
  singleFileMiddleware,
  processSingleFileUpload,
  ...discount_file_put_rules,
  validateRules,
  asyncHandler(discount_file_put_permission),
  asyncHandler(discount_file_put_controller)
);
discountRoutes.delete(
  "/:idDiscount",
  discount_delete_rules,
  validateRules,
  asyncHandler(discount_delete_permission),
  asyncHandler(discount_delete_controller)
);
discountRoutes.delete(
  "/file/:idDiscount",
  discount_file_delete_rules,
  validateRules,
  asyncHandler(discount_file_delete_permission),
  asyncHandler(discount_file_delete_controller)
);

export default discountRoutes;
