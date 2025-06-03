import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import uploadFile from "./api/files/controllers/file";

const app = express();

app.use(express.json());

app.post("/upload", uploadFile);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Api is running smoothly" });
});

export default app;
