import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();

import { apiRoutes } from "./api/common/apiRoutes";
import errorController from "./api/errors/errorController";
import "./utils/monkeyPatch";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/", apiRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Api is running smoothly" });
});

app.use(errorController);

export default app;
