import { Request, Response, NextFunction } from "express";

export default function notFound(req: Request, res: Response, next: NextFunction) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` });
  }
  