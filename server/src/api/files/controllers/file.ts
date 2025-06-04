import { NextFunction, Request, Response } from "express";
import { createWriteStream, mkdirSync } from "fs";
import busboy from "busboy";
import path from "path";

import * as fileServices from "../services/file";
import catchAsync from "../../common/utils/catchAsync";
import AppError from "../../errors/appError";
import { File } from "@prisma/client";

const UPLOAD_ROOT = path.resolve("uploads");

export const uploadFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError("Unauthorized", 401));
  }

  let totalBytes = 0;

  const bb = busboy({ headers: req.headers, limits: { fileSize: 6 * 1024 ** 3 } });

  const filePromise = new Promise<File>((resolve, reject) => {
    bb.on("file", (name, file, info) => {
      const { filename, mimeType } = info;
      const destinationDir = path.join(UPLOAD_ROOT, req.user!.id!.toString());

      try {
        mkdirSync(destinationDir, { recursive: true });
      } catch (error) {
        console.log(error);
        return reject(new AppError("Failed to create upload directory", 500));
      }

      const storedFilename = fileServices.generateStorageKey(filename);
      const destinationPath = path.join(destinationDir, storedFilename);
      const writeStream = createWriteStream(destinationPath);

      file.on("data", (chunk) => {
        totalBytes += chunk.length;
      });
      file.pipe(writeStream);

      writeStream.on("finish", async () => {
        try {
          const createdFile = await fileServices.createFile(
            req.user!.id!,
            filename,
            storedFilename,
            mimeType,
            totalBytes
          );
          resolve(createdFile);
        } catch (err) {
          reject(err);
        }
      });
      writeStream.on("error", reject);
    });

    bb.on("error", reject);
  });

  req.pipe(bb);

  const file = await filePromise;
  res.status(201).json({
    status: "success",
    data: {
      file: {
        ...file,
        size: file.size.toString(),
      },
    },
  });
});
