import { Router } from "express";

import { customJwtAuth } from "../../middlewares/authentications/jwt/customJwtAuth";
import proteinRoutes from "./protein.routes";
import commandRoutes from "./command.routes";

const router = Router();

router.use(customJwtAuth);

router.use("/protein", proteinRoutes);
router.use("/command", commandRoutes);

export default router;
