"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
}
exports.default = errorHandler;
