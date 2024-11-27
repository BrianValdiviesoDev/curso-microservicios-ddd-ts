import { Request, Response } from 'express';
import logger from '../logger';
import { AppError } from '../../errors/errorfactory';
import { NextFunction } from 'connect';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next:NextFunction,
) => {
	logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
	logger.debug(err.stack);
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: err.message || 'Something went wrong',
	  });
	}
	
	return;
};
