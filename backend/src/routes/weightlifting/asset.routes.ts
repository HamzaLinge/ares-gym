import { Router } from "express";

import {
  weightlifting_asset_create_permission,
  weightlifting_asset_get_permission,
} from "../../middlewares/permissions/weightlifting/asset.permissions";
import {
  weightlifting_asset_create_rules,
  weightlifting_asset_get_rules,
} from "../../middlewares/validators/weightlifting/asset.rules";
import { validate } from "../../middlewares/validators/validate";
import {
  weightlifting_asset_create_controller,
  weightlifting_asset_get_controller,
} from "../../controllers/weightlifting/asset.controllers";

const router = Router();

router.post(
  "",
  weightlifting_asset_create_permission,
  ...weightlifting_asset_create_rules,
  validate,
  weightlifting_asset_create_controller
);
router.get(
  "",
  weightlifting_asset_get_permission,
  ...weightlifting_asset_get_rules,
  validate,
  weightlifting_asset_get_controller
);
router.put("");
router.delete("");

export default router;
