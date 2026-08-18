import {
    Request,
    Response,
    NextFunction,
} from "express";

import AppError from "@src/errors/app.error";

export default function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });

        return;
    }

    res.status(500).json({
        message: "Internal server error",
    });
}