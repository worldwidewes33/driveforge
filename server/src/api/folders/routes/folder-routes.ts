import { Router } from "express";
import { protect } from "../../auth/controllers/auth-controllers";
import * as folderControllers from "../controllers/folder-controllers";
import * as fileControllers from "../../files/controllers/file-controllers";

const router = Router();

router.use(protect);

router.route("/").get(folderControllers.getAllFolders);

router.post("/:parentFolderId", folderControllers.createFolder);

router
  .route("/:id")
  .get(folderControllers.getFolder)
  .patch(folderControllers.updateFolder)
  .delete(folderControllers.deleteFolder);

router.post("/:folderId/files", fileControllers.uploadFile);

export { router as folderRoutes };
