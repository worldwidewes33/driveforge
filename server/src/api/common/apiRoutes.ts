import { Router } from "express";
import { authRoutes } from "../auth/routes/auth-routes";
import { fileRoutes } from "../files/routes/file-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/files", fileRoutes);

export { router as apiRoutes };
