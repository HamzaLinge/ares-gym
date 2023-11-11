import { Router } from "express";

const router = Router();

router.get("/create");
router.get("/get-all");
router.get("/get-by-id");
router.put("/edit");
router.delete("/delete");

export default router;
