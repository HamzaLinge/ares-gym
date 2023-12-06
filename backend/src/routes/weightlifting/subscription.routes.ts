import { Router } from "express";
import {
  weightlifting_subscription_delete_rules,
  weightlifting_subscription_get_admin_rules,
  weightlifting_subscription_get_subscriber_rules,
  weightlifting_subscription_post_rules,
  weightlifting_subscription_put_admin_rules,
  weightlifting_subscription_put_subscriber_rules,
} from "../../middlewares/rules/weightlifting/subscription.rules";
import { validate } from "../../middlewares/rules/validate";
import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  weightlifting_subscription_delete_permission,
  weightlifting_subscription_get_admin_permission,
  weightlifting_subscription_get_subscriber_permission,
  weightlifting_subscription_post_permission,
  weightlifting_subscription_put_admin_permission,
  weightlifting_subscription_put_subscriber_permission,
} from "../../middlewares/permissions/weightlifting/subscription.permissions";
import {
  weightlifting_subscription_delete_controller,
  weightlifting_subscription_get_admin_controller,
  weightlifting_subscription_get_subscriber_controller,
  weightlifting_subscription_post_controller,
  weightlifting_subscription_put_admin_controller,
  weightlifting_subscription_put_subscriber_controller,
} from "../../controllers/weightlifting/subscription.controllers";
import {
  singleFileMiddleware,
  processSingleFileUpload,
} from "../../middlewares/fileUpload";

const router = Router();

router.post(
  "",
  singleFileMiddleware,
  processSingleFileUpload,
  ...weightlifting_subscription_post_rules,
  validate,
  asyncHandler(weightlifting_subscription_post_permission),
  asyncHandler(weightlifting_subscription_post_controller)
);

router.get(
  "/subscriber",
  weightlifting_subscription_get_subscriber_rules,
  validate,
  asyncHandler(weightlifting_subscription_get_subscriber_permission),
  asyncHandler(weightlifting_subscription_get_subscriber_controller)
);

router.get(
  "/admin",
  weightlifting_subscription_get_admin_rules,
  validate,
  asyncHandler(weightlifting_subscription_get_admin_permission),
  asyncHandler(weightlifting_subscription_get_admin_controller)
);

router.put(
  "/subscriber",
  singleFileMiddleware,
  processSingleFileUpload,
  ...weightlifting_subscription_put_subscriber_rules,
  validate,
  asyncHandler(weightlifting_subscription_put_subscriber_permission),
  asyncHandler(weightlifting_subscription_put_subscriber_controller)
);

router.put(
  "/admin",
  singleFileMiddleware,
  processSingleFileUpload,
  ...weightlifting_subscription_put_admin_rules,
  validate,
  asyncHandler(weightlifting_subscription_put_admin_permission),
  asyncHandler(weightlifting_subscription_put_admin_controller)
);

router.delete(
  "/:idSubscription",
  weightlifting_subscription_delete_rules,
  validate,
  asyncHandler(weightlifting_subscription_delete_permission),
  asyncHandler(weightlifting_subscription_delete_controller)
);

export default router;
