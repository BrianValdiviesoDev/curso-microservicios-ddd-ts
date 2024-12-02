export class AppError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	  Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Not found') {
		super(message);
	}
}

export class BadRequestError extends AppError {
	constructor(message: string = 'Bad Request') {
		super(message);
		this.name = 'BadRequestError';
	}
}

export class ValidationError extends AppError {
	constructor(message: string = 'Validation failed') {
		super(message);
		this.name = 'ValidationError';
	}
}