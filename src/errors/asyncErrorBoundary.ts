import { RequestHandler, Request, Response, NextFunction } from "express-serve-static-core";

export default function asyncErrorBoundary<T>(delegate: RequestHandler<T>, defaultStatus?: string) {
    return (request: Request<T>, response: Response, next: NextFunction) => {
      Promise.resolve()
        .then(() => delegate(request, response, next))
        .catch((error = {}) => {
          const { status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
    };
  }
  
