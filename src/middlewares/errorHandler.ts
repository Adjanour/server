// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ENV_TYPE } from '../../config/config';
import AppError from '../utils/AppError';

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    // If the error is not an instance of AppError, create a new one
    if (!(err instanceof AppError)) {
        err = new AppError('An unknown error occurred!', 500);
    }

    // Log the error (you might want to add more logging here)
    console.error('ERROR 💥', err);

    // Send error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(ENV_TYPE === 'Development' && { stack: err.stack })
    });
};

export default errorHandler;
