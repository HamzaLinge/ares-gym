import { Router } from "express";

import { customJwtAuth } from "../../middlewares/authentications/jwt/customJwtAuth";

import weightliftingAssetRoutes from "./asset.routes";
import weightliftingPlanRoutes from "./plan.routes";
import weightliftingSubscriptionRoutes from "./subscription.routes";

const router = Router();

router.use(customJwtAuth);

// Weightlifting Assets
router.use("/asset", weightliftingAssetRoutes);

// Weightlifting Plans
router.use("/plan", weightliftingPlanRoutes);

// Weightlifting Subscriptions
router.use("/subscription", weightliftingSubscriptionRoutes);

export default router;
