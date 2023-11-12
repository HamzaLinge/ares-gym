import { Router } from "express";

import { asyncHandler } from "../../middlewares/asyncHandler";
import {
  weightlifting_asset_create_rules,
  weightlifting_asset_delete_rules,
  weightlifting_asset_get_rules,
  weightlifting_asset_put_rules,
} from "../../middlewares/rules/weightlifting/asset.rules";
import { validate } from "../../middlewares/rules/validate";
import {
  weightlifting_asset_create_permission,
  weightlifting_asset_delete_permission,
  weightlifting_asset_get_permission,
  weightlifting_asset_put_permission,
} from "../../middlewares/permissions/weightlifting/asset.permissions";
import {
  weightlifting_asset_create_controller,
  weightlifting_asset_delete_controller,
  weightlifting_asset_get_controller,
  weightlifting_asset_put_controller,
} from "../../controllers/weightlifting/asset.controllers";

const router = Router();

router.post(
  "",
  weightlifting_asset_create_rules,
  validate,
  asyncHandler(weightlifting_asset_create_permission),
  asyncHandler(weightlifting_asset_create_controller)
);
router.get(
  "",
  weightlifting_asset_get_rules,
  validate,
  asyncHandler(weightlifting_asset_get_permission),
  asyncHandler(weightlifting_asset_get_controller)
);
router.put(
  "",
  weightlifting_asset_put_rules,
  validate,
  asyncHandler(weightlifting_asset_put_permission),
  asyncHandler(weightlifting_asset_put_controller)
);
router.delete(
  "",
  ...weightlifting_asset_delete_rules,
  validate,
  asyncHandler(weightlifting_asset_delete_permission),
  asyncHandler(weightlifting_asset_delete_controller)
);

export default router;
