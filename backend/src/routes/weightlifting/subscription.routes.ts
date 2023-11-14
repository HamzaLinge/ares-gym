import { Router } from "express";
import { weightlifting_subscription_post_rules } from "../../middlewares/rules/weightlifting/subscription.rules";
import { validate } from "../../middlewares/rules/validate";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { weightlifting_subscription_post_permission } from "../../middlewares/permissions/weightlifting/subscription.permissions";
import { weightlifting_subscription_post_controller } from "../../controllers/weightlifting/subscription.controllers";
import {
  fileUploadMiddleware,
  processFileUpload,
} from "../../middlewares/fileUpload";

const router = Router();

router.post(
  "",
  fileUploadMiddleware,
  processFileUpload,
  ...weightlifting_subscription_post_rules,
  validate,
  asyncHandler(weightlifting_subscription_post_permission),
  asyncHandler(weightlifting_subscription_post_controller)
);
router.get("");
router.put("");
router.delete("/:idSubscription");

export default router;
