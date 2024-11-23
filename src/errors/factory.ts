import { AppError } from './appErrors';

export const ErrorFactory = {
	badRequest: (message = 'Bad Request') => new AppError(message, 400),
	unauthorized: (message = 'Unauthorized') => new AppError(message, 401),
	forbidden: (message = 'Forbidden') => new AppError(message, 403),
	notFound: (message = 'Not Found') => new AppError(message, 404),
	internalServerError: (message = 'Internal Server Error') => new AppError(message, 500),
};
