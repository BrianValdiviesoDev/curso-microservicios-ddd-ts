export class AppError extends Error {
	public statusCode: number;
  
	constructor(message: string, statusCode: number) {
	  super(message);
	  this.statusCode = statusCode;
	  Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Not found') {
		super(message, 404);
	}
}

export class BadRequestError extends AppError {
	constructor(message: string = 'Bad Request') {
		super(message, 400);
	}
}