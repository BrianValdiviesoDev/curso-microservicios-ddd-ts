import { NextFunction, Request, Response } from 'express';
import logger from '../logger';
import { BadRequestError, NotFoundError, ValidationError } from '../../errors/errorfactory';

export class ErrorHandler{

	static handle(err: Error, req: Request, res: Response, next: NextFunction) {
		logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);
		if (err.name === NotFoundError.name) {
			ErrorHandler.buildResponse(err.message, 404, res);
		} else if (err.name == BadRequestError.name || err.name == ValidationError.name) {
			ErrorHandler.buildResponse(err.message, 400, res);
		} else {
			ErrorHandler.buildResponse(err.message, 500, res);
		}
		next();
	}

	static buildResponse(error: string, statusCode: number, res: Response) {
		return res.status(statusCode).send(error);
	}
}
