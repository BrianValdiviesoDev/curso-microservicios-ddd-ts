import { Request, Response } from 'express';
import logger from '../logger';
import { AppError } from '../../errors/appErrors';

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
) => {
	let error = err;

	// Si el error no es una instancia de AppError, crea uno genérico
	if (!(err instanceof AppError)) {
		error = new AppError(`An unexpected error occurred - ${error}`, 500);
	}

	const appError = error as AppError;
  
	logger.error(`${appError.message} - ${req.method} ${req.originalUrl}`);
	logger.debug(err.stack);
	res.status(appError.statusCode).json({
		statusCode: appError.statusCode,
		message: appError.message,
	});
};
