import { Router } from "express";
import { authRoutes } from "../auth/routes/auth-routes";
import { fileRoutes } from "../files/routes/file-routes";
import { folderRoutes } from "../folders/routes/folder-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/files", fileRoutes);
router.use("/folders", folderRoutes);

export { router as apiRoutes };
