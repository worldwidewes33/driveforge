import { Router } from "express";
import * as fileController from "../controllers/file-controllers";
import { protect } from "../../auth/controllers/auth-controllers";

const router = Router();

router.use(protect);

router
  .route("/:id")
  .get(fileController.getFile)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);

router.get("/download/:id", fileController.downloadFileAttachment);
router.get("/inline/:id", fileController.downloadFileInline);

export { router as fileRoutes };
