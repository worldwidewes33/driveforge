import { Folder } from "@prisma/client";
import { getFolderAndRecursiveChildren } from "@prisma/client/sql";
import prisma from "../../common/prisma";

export const getFolder = async (folderId: number, ownerId: number): Promise<Folder | null> => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
      ownerId,
    },
    include: {
      children: true,
      files: true,
    },
  });

  return folder;
};

export const createFolder = async (name: string, ownerId: number, parentFolderId: number) => {
  const folder = await prisma.folder.create({
    data: {
      name,
      ownerId,
      parentFolderId,
    },
  });

  return folder;
};

export const updateFolder = async (
  name: string,
  folderId: number,
  ownerId: number
): Promise<Folder> => {
  const folder = await prisma.folder.update({
    where: {
      id: folderId,
      ownerId,
    },
    data: {
      name,
    },
  });

  return folder;
};

export const deleteFolder = async (folderId: number, ownerId: number) => {
  const recursiveFolders = await prisma.$queryRawTyped(getFolderAndRecursiveChildren(folderId));

  const folderIds = recursiveFolders.map((folder) => folder.id) as number[];

  const folders = await prisma.folder.updateMany({
    where: {
      id: { in: folderIds },
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return folders;
};

export const getDeletedFolders = async (ownerId: number): Promise<Folder[]> => {
  const folders = await prisma.folder.findMany({
    where: {
      ownerId,
      deletedAt: { not: null },
      parentFolder: {
        deletedAt: null,
      },
    },
  });

  return folders;
};
