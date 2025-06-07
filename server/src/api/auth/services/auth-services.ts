import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import ms from "ms";
import { Response } from "express";

import { User } from "@prisma/client";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const verifyPasswords = (hashedPassword: string, testPassword: string): boolean => {
  return bcrypt.compareSync(testPassword, hashedPassword);
};

export const createAndSendJWT = (res: Response, status: number, user: Partial<User>): void => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as ms.StringValue,
  });

  res.status(status).json({ status: "success", data: { jwt: token, user } });
};

export const verifyJWT = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;

  return decoded;
};
