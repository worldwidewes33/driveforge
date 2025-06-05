import { NextFunction, Request, Response } from "express";
import busboy from "busboy";

import * as fileServices from "../services/file-services";
import catchAsync from "../../common/utils/catchAsync";
import AppError from "../../errors/appError";
import { File } from "@prisma/client";

export const uploadFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
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
