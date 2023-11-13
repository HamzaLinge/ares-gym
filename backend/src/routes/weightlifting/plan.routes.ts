import { Router } from "express";
import {
  weightlifting_plan_delete_permission,
  weightlifting_plan_get_permission,
  weightlifting_plan_post_permission,
  weightlifting_plan_put_permission,
} from "../../middlewares/permissions/weightlifting/plan.permissions";
import {
  weightlifting_plan_delete_controller,
  weightlifting_plan_get_controller,
  weightlifting_plan_post_controller,
  weightlifting_plan_put_controller,
} from "../../controllers/weightlifting/plan.controllers";
import {
  weightlifting_plan_delete_rules,
  weightlifting_plan_get_rules,
  weightlifting_plan_post_rules,
  weightlifting_plan_put_rules,
} from "../../middlewares/rules/weightlifting/plan.rules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { validate } from "../../middlewares/rules/validate";

const router = Router();

router.post(
  "",
  weightlifting_plan_post_rules,
  validate,
  asyncHandler(weightlifting_plan_post_permission),
  asyncHandler(weightlifting_plan_post_controller)
);
router.get(
  "",
  weightlifting_plan_get_rules,
  validate,
  asyncHandler(weightlifting_plan_get_permission),
  asyncHandler(weightlifting_plan_get_controller)
);
router.put(
  "",
  weightlifting_plan_put_rules,
  validate,
  asyncHandler(weightlifting_plan_put_permission),
  asyncHandler(weightlifting_plan_put_controller)
);
router.delete(
  "/:idWeightliftingPlan",
  weightlifting_plan_delete_rules,
  validate,
  asyncHandler(weightlifting_plan_delete_permission),
  asyncHandler(weightlifting_plan_delete_controller)
);

export default router;
