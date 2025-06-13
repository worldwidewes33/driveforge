import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import { apiRoutes } from "./api/common/apiRoutes";
import AppError from "./api/errors/appError";
import errorController from "./api/errors/errorController";
import "./utils/monkeyPatch";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/", apiRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Api is running smoothly" });
});

// create a catch all route for undefined routes the pass an AppError to the global error handler with code 404
// Uncomment the following lines to enable catch-all route for undefined routes

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot reach ${req.originalUrl} on this server`, 404));
});

app.use(errorController);

export default app;
