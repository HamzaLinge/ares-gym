import { Router } from "express";

import { customJwtAuth } from "../../middlewares/authentications/jwt/customJwtAuth";
import proteinRoutes from "./protein.routes";

const router = Router();

router.use(customJwtAuth);

router.use("/protein", proteinRoutes);

export default router;
