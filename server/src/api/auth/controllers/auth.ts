import { Response, Request, NextFunction } from "express";

import userPrismaClient from "../services/userPrismaClient";
import * as authServices from "../services/auth";
import catchAsync from "../../common/utils/catchAsync";
import AppError from "../../errors/appError";

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer")) {
    return next(new AppError("Please login to access this resource", 401));
  }

  const token = authorization.split(" ")[1];
  const decoded = authServices.verifyJWT(token);

  if (!decoded) {
    return next(
      new AppError("Invalid authorization token, Please login to access this resource", 401)
    );
  }

  const user = await userPrismaClient.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    return next(new AppError("Invalid authorization token. User does not exist.", 401));
  }

  req.user = user;
  next();
});

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide valid email and password", 400));
  }

  const newUser = await userPrismaClient.user.create({
    data: {
      email,
      password,
      firstname,
      lastname,
    },
  });

  authServices.createAndSendJWT(res, 201, newUser);
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Invalid email or password", 401));
  }

  const user = await userPrismaClient.user.findUnique({
    where: {
      email,
    },
    omit: {
      password: false,
    },
  });

  const passwordVerified = authServices.verifyPasswords(user?.password ?? "", password);

  if (!user || !passwordVerified) {
    return next(new AppError("Invalid email or password", 401));
  }

  user.password = "";

  authServices.createAndSendJWT(res, 200, user);
});
