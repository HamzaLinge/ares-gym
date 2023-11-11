import { Router } from "express";

import { validate } from "../../middlewares/validators/validate";
import {
  weightlifting_subscription_permission_cancel,
  weightlifting_subscription_permission_create,
} from "../../middlewares/permissions/weightlifting/subscription.permissions";
import {
  weightlifting_subscription_rules_cancel,
  weightlifting_subscription_rules_create,
} from "../../middlewares/validators/weightlifting/subscription.rules";
import {
  weightlifting_subscription_controller_cancel,
  weightlifting_subscription_controller_create,
} from "../../controllers/weightlifting/subscription.controllers";

const router = Router();

router.post(
  "/create",
  weightlifting_subscription_permission_create,
  ...weightlifting_subscription_rules_create,
  validate,
  weightlifting_subscription_controller_create
);
router.get("/all");
router.get("/:id");
router.put("/:id");
router.delete(
  "/:id",
  ...weightlifting_subscription_rules_cancel,
  validate,
  weightlifting_subscription_permission_cancel,
  weightlifting_subscription_controller_cancel
);

export default router;
