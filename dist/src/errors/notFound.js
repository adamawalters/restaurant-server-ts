"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notFound(req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}
exports.default = notFound;
