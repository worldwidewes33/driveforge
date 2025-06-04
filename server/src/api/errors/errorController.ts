import { Request, Response, NextFunction } from "express";

export default function errorController(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  err.statusCode = err.statusCode ?? 500;
  err.message = err.message ?? "Internal server error";
  err.status = err.status ?? "error";

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}
