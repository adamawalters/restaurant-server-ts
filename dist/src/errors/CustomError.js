"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.default = CustomError;
