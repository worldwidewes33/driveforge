import { Router } from "express";
import * as fileController from "../controllers/file-controllers";
import { protect } from "../../auth/controllers/auth-controllers";

const router = Router();

router.route("/").post(protect, fileController.uploadFile);

export { router as fileRoutes };
