import { Request, Response, NextFunction } from "express";
import AppError from "../../errors/appError";
import catchAsync from "../../common/utils/catchAsync";
import constants from "../../common/constants";
import * as folderServices from "../services/folder-services";

export const createFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;
  const parentFolderId = parseInt(req.params.parentFolderId);
  const { name } = req.body;

  if (isNaN(parentFolderId)) {
    return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("Folder"), 400));
  }

  if (!name) {
    return next(new AppError(constants.errorHandling.INCLUDE_PARAM("name"), 400));
  }

  const folder = await folderServices.createFolder(name, userId, parentFolderId);

  res.status(201).json({ status: "success", data: { folder } });
});

export const getFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;
  const folderId = parseInt(req.params.id);

  if (isNaN(folderId)) {
    return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("Folder"), 400));
  }

  const folder = await folderServices.getFolder(folderId, userId);

  if (!folder) {
    return next(new AppError(constants.errorHandling.MODEL_NOT_FOUND("Folder"), 404));
  }

  res.status(200).json({ status: "success", data: { folder } });
});

export const updateFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;
  const folderId = parseInt(req.params.id);

  if (isNaN(folderId)) {
    return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("Folder"), 400));
  }

  const { name } = req.body;

  if (!name) {
    return next(new AppError(constants.errorHandling.INCLUDE_PARAM("name"), 400));
  }

  const folder = await folderServices.updateFolder(name, folderId, userId);

  res.status(200).json({ status: "success", data: { folder } });
});

export const deleteFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;
  const folderId = parseInt(req.params.id);

  if (isNaN(folderId)) {
    return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("Folder"), 400));
  }

  const folder = await folderServices.deleteFolder(folderId, userId);

  res.status(204).json({ status: "success", data: { folder } });
});
