import path from "path";
import { v4 as uuid } from "uuid";
import { createWriteStream, mkdirSync, createReadStream, ReadStream } from "fs";
import { FileType, File } from "@prisma/client";
import prisma from "../../common/prisma";
import AppError from "../../errors/appError";

const UPLOAD_ROOT = path.resolve("uploads");

// Helper functions
const generateStorageKey = (originalName: string) => {
  const ext = path.extname(originalName).toLowerCase();
  return `${uuid()}${ext}`;
};

const getDestinationDir = (userId: number): string => {
  return path.join(UPLOAD_ROOT, userId.toString());
};

const createFile = async (
  ownerId: number,
  originalName: string,
  storedName: string,
  mimeType: string,
  size: number
) => {
  const type = mimeType.split("/")[0].toUpperCase() as FileType;
  const file = await prisma.file.create({
    data: {
      ownerId,
      original_filename: originalName,
      stored_filename: storedName,
      mimeType,
      size,
      type,
    },
  });

  return file;
};

// Module exports
export const getAllFiles = async (userId: number): Promise<File[]> => {
  const files = await prisma.file.findMany({
    where: {
      ownerId: userId,
    },
  });

  return files;
};

export const getFile = async (userId: number, fileId: number): Promise<File | null> => {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
      ownerId: userId,
    },
  });

  return file;
};
export const getFileReadStream = (userId: number, filename: string): ReadStream => {
  const filePath = path.join(UPLOAD_ROOT, userId.toString(), filename);
  const fileStream = createReadStream(filePath);

  return fileStream;
};

export const processFileEvent = (
  userId: number,
  file: NodeJS.ReadableStream,
  info: { filename: string; encoding: string; mimeType: string }
): Promise<File> => {
  const { filename, mimeType } = info;
  const destinationDir = getDestinationDir(userId);

  try {
    mkdirSync(destinationDir, { recursive: true });
  } catch (error) {
    console.log(error);
    file.resume(); // drain the file data
    return Promise.reject(new AppError("Failed to create upload directory", 500));
  }

  let totalBytes = 0;
  const storedFilename = generateStorageKey(filename);
  const destinationPath = path.join(destinationDir, storedFilename);
  const writeStream = createWriteStream(destinationPath);

  file.on("data", (chunk) => {
    totalBytes += chunk.length;
  });
  file.pipe(writeStream);

  return new Promise<File>((resolve, reject) => {
    writeStream.on("finish", async () => {
      try {
        const createdFile = await createFile(
          userId,
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
    file.on("error", reject);
  });
};
