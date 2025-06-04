import { Router } from "express";
import { authRoutes } from "../auth/routes/auth";
import { fileRoutes } from "../files/routes/file";

const router = Router();

router.use("/auth", authRoutes);
router.use("/files", fileRoutes);

export { router as apiRoutes };
