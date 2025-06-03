import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import busboy from "busboy";
import path from "path";

const UPLOAD_ROOT = path.resolve("uploads");

const generateStorageKey = (originalName: string) => {
  const ext = path.extname(originalName).toLowerCase();
  return `${uuid()}${ext}`;
};

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  if (!existsSync(UPLOAD_ROOT)) {
    mkdirSync(UPLOAD_ROOT);
  }

  let totalBytes = 0;

  const bb = busboy({ headers: req.headers, limits: { fileSize: 6 * 1024 ** 3 } });

  bb.on("file", async (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: ${filename}, encoding: ${encoding}, mimeType: ${mimeType}`
    );

    const destinationPath = path.join(UPLOAD_ROOT, generateStorageKey(filename));
    const writeStream = createWriteStream(destinationPath);

    file.on("data", (chunk) => {
      totalBytes += chunk.length;
    });
    file.pipe(writeStream);

    writeStream.on("finish", () => console.log("File fully uploaded"));
    writeStream.on("error", next);
  });

  bb.on("close", () => {
    res.status(201).json({ status: "success", data: { totalBytes } });
  });
  bb.on("error", next);
  req.pipe(bb);
};

export default uploadFile;
