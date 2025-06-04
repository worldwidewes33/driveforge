import { Router } from "express";
import { authRoutes } from "../auth/routes/auth";

const router = Router();

router.use("/auth", authRoutes);

export { router as apiRoutes };
