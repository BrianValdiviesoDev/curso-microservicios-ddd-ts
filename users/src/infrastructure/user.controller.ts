import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '../application/createUser.dto';
import { CreateUserUseCase } from '../application/createUser.useCase';
import { UserDbAdapter } from './userDb.adapter';
import { FindUserUseCase } from '../application/findUser.useCase';

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

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userUseCase = new FindUserUseCase(new UserDbAdapter());
		const user = await userUseCase.execute(req.params.id);
		res.status(201).send(user);
		return;
	} catch (e) {
		next(e);
	}
};