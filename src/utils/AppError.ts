export class AppError extends Error {
    public statusCode: number;
    public status: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = false;
        Error.captureStackTrace(this, this.constructor);
    }
}
