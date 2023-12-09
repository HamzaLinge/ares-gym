import { Router } from "express";
import { customJwtAuth } from "../../middlewares/auth/jwt/customJwtAuth";

const router = Router();

router.use(customJwtAuth);

export default router;
