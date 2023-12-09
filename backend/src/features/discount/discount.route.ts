import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  discount_delete_permission,
  discount_get_permission,
  discount_post_permission,
  discount_put_permission,
} from "./discount.permission";
import {
  discount_delete_rules,
  discount_get_rules,
  discount_post_rules,
  discount_put_rules,
} from "./discount.rule";
import { validateRules } from "../../middlewares/validateRules";
import {
  discount_delete_controller,
  discount_get_controller,
  discount_post_controller,
  discount_put_controller,
} from "./discount.controller";
import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";
import {
  singleFileMiddleware,
  processSingleFileUpload,
} from "../../middlewares/fileUpload";

const router = Router();

router.use(customJwtAuth);

router.post(
  "",
  singleFileMiddleware,
  processSingleFileUpload,
  ...discount_post_rules,
  validateRules,
  asyncHandler(discount_post_permission),
  asyncHandler(discount_post_controller)
);
router.get(
  "",
  discount_get_rules,
  validateRules,
  asyncHandler(discount_get_permission),
  asyncHandler(discount_get_controller)
);
router.put(
  "",
  singleFileMiddleware,
  processSingleFileUpload,
  ...discount_put_rules,
  validateRules,
  asyncHandler(discount_put_permission),
  asyncHandler(discount_put_controller)
);
router.delete(
  "/:idDiscount",
  discount_delete_rules,
  validateRules,
  asyncHandler(discount_delete_permission),
  asyncHandler(discount_delete_controller)
);

export default router;
