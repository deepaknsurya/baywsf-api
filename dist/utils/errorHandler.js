"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = false;
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
exports.errorHandler = errorHandler;
