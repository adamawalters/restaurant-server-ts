import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError"

export default function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
  }