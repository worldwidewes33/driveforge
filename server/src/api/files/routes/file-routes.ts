import { Router } from "express";
import * as fileController from "../controllers/file-controllers";
import { protect } from "../../auth/controllers/auth-controllers";

const router = Router();

router.route("/").post(protect, fileController.uploadFile);
router.get("/download/:id", protect, fileController.downloadFileAttachment);
router.get("/inline/:id", protect, fileController.downloadFileInline);

export { router as fileRoutes };
