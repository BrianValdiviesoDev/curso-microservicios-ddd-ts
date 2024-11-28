import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { AppError } from '../../errors/errorfactory';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	} else if (err instanceof Error) {
		res.status(400).json({
			status: 'error',
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: 'Something went wrong',
	  });
	}
	next();
	return;
};
