import { Router } from "express";
import * as fileController from "../controllers/file";
import { protect } from "../../auth/controllers/auth";

const router = Router();

router.route("/").post(protect, fileController.uploadFile);

export { router as fileRoutes };
