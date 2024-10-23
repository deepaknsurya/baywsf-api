"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
