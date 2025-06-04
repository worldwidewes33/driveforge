import path from "path";
import { v4 as uuid } from "uuid";
import { FileType } from "@prisma/client";
import prisma from "../../common/prisma";

export const generateStorageKey = (originalName: string) => {
  const ext = path.extname(originalName).toLowerCase();
  return `${uuid()}${ext}`;
};

export const createFile = async (
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
