import { Router } from "express";

import { asyncHandler } from "../middlewares/asyncHandler";
import {
  discount_delete_permission,
  discount_get_permission,
  discount_post_permission,
  discount_put_permission,
} from "../middlewares/permissions/discount.permissions";
import {
  discount_delete_rules,
  discount_get_rules,
  discount_post_rules,
  discount_put_rules,
} from "../middlewares/rules/discount.rules";
import { validate } from "../middlewares/rules/validate";
import {
  discount_delete_controller,
  discount_get_controller,
  discount_post_controller,
  discount_put_controller,
} from "../controllers/discount.controllers";
import { customJwtAuth } from "../middlewares/authentications/jwt/customJwtAuth";
import {
  fileUploadMiddleware,
  processFileUpload,
} from "../middlewares/fileUpload";

const router = Router();

router.use(customJwtAuth);

router.post(
  "",
  fileUploadMiddleware,
  processFileUpload,
  ...discount_post_rules,
  validate,
  asyncHandler(discount_post_permission),
  asyncHandler(discount_post_controller)
);
router.get(
  "",
  discount_get_rules,
  validate,
  asyncHandler(discount_get_permission),
  asyncHandler(discount_get_controller)
);
router.put(
  "",
  fileUploadMiddleware,
  processFileUpload,
  ...discount_put_rules,
  validate,
  asyncHandler(discount_put_permission),
  asyncHandler(discount_put_controller)
);
router.delete(
  "/:idDiscount",
  discount_delete_rules,
  validate,
  asyncHandler(discount_delete_permission),
  asyncHandler(discount_delete_controller)
);

export default router;
