import { Router } from "express";
import * as fileController from "../controllers/file-controllers";
import { protect } from "../../auth/controllers/auth-controllers";

const router = Router();

router.use(protect);

router.route("/").get(fileController.getAllFiles).post(fileController.uploadFile);

router
  .route("/:id")
  .get(fileController.getFile)
  .post(fileController.updateFile)
  .delete(fileController.deleteFile);

router.get("/download/:id", fileController.downloadFileAttachment);
router.get("/inline/:id", fileController.downloadFileInline);

export { router as fileRoutes };
