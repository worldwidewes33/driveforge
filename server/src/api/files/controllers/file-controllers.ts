import { NextFunction, Request, Response } from "express";
import busboy from "busboy";
import { pipeline } from "stream/promises";

import { File } from "@prisma/client";
import * as fileServices from "../services/file-services";
import catchAsync from "../../common/utils/catchAsync";
import AppError from "../../errors/appError";
import constants from "../../common/constants";

// helper functions
const serverFile = (disposition: "download" | "inline") => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
    }

    const userId = req.user.id!;
    const fileId = parseInt(req.params.id);

    if (isNaN(fileId)) {
      return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("File"), 400));
    }

    const file = await fileServices.getFile(userId, fileId);

    if (!file) {
      return next(new AppError(constants.errorHandling.MODEL_NOT_FOUND("File"), 404));
    }

    const fileStream = fileServices.getFileReadStream(userId, file.stored_filename);

    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `${disposition}; filename="${file.original_filename}"`);
    res.setHeader("Content-Length", file.size.toString());
    res.setHeader("Last-Modified", file.updatedAt.toUTCString());

    try {
      await pipeline(fileStream, res);
    } catch (err) {
      console.log(err);
      return next(err);
    }
  });
};

// exported controllers
export const uploadFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  // set up busboy
  const bb = busboy({ headers: req.headers, limits: { fileSize: 6 * 1024 ** 3 } });

  // create array for all files
  const filePromises: Promise<File>[] = [];
  const userId = req.user.id!;

  bb.on("file", (name, file, info) => {
    filePromises.push(fileServices.processFileEvent(userId, file, info));
  });

  bb.on("error", (err) => filePromises.push(Promise.reject(err)));

  req.pipe(bb);

  await new Promise<void>((resolve, reject) => {
    bb.on("close", resolve);
    bb.on("error", reject);
  });

  const files = await Promise.all(filePromises);

  res.status(201).json({
    status: "success",
    data: {
      files: files.map((file) => {
        return {
          ...file,
          size: file.size.toString(),
        };
      }),
    },
  });
});

export const downloadFileAttachment = serverFile("download");

export const downloadFileInline = serverFile("inline");

export const getFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;
  const fileId = parseInt(req.params.id);

  if (isNaN(fileId)) {
    return next(new AppError(constants.errorHandling.INVALID_MODEL_ID("File"), 400));
  }

  const file = await fileServices.getFile(userId, fileId);

  if (!file) {
    return next(new AppError(constants.errorHandling.MODEL_NOT_FOUND("File"), 404));
  }

  res.status(200).json({ status: "success", data: { file } });
});

export const getAllFiles = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError(constants.errorHandling.INVALID_AUTH_CREDENTIALS, 401));
  }

  const userId = req.user.id!;

  const files = await fileServices.getAllFiles(userId);

  res.status(200).json({ status: "success", data: { files } });
});
