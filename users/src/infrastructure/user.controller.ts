import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '../application/createUser.dto';
import { CreateUserUseCase } from '../application/createUser.useCase';
import { UserDbAdapter } from './userDb.adapter';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const createUserDTO = new CreateUserDTO(
			req.body.name,
			req.body.email,
			req.body.birth_date,
			req.body.car_license
		);
		const userUseCase = new CreateUserUseCase(new UserDbAdapter());
		const createdUser = await userUseCase.execute(createUserDTO);
		res.status(201).send(createdUser);
		return;

	} catch (e) {
		next(e);
	}
};
