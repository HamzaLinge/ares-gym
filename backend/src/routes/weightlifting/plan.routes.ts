import { Router } from "express";
import { weightlifting_plan_post_permission } from "../../middlewares/permissions/weightlifting/plan.permissions";
import { weightlifting_plan_create_controller } from "../../controllers/weightlifting/plan.controllers";
import { weightlifting_plan_post_rules } from "../../middlewares/rules/weightlifting/plan.rules";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { validate } from "../../middlewares/rules/validate";

const router = Router();

router.post(
  "",
  weightlifting_plan_post_rules,
  validate,
  asyncHandler(weightlifting_plan_post_permission),
  asyncHandler(weightlifting_plan_create_controller)
);
router.get("");
router.put("");
router.delete("");

export default router;
