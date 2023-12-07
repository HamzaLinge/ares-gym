import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { file_get_controller } from "../controllers/file.controllers";
import { file_get_rules } from "../middlewares/rules/file.rules";
import { validate } from "../middlewares/rules/validate";
import { customJwtAuth } from "../middlewares/authentications/jwt/customJwtAuth";

const router = Router();

router.use(customJwtAuth);

// router.get(
//   "/:idFile",
//   file_get_rules,
//   validate,
//   asyncHandler(file_get_controller)
// );

export default router;
