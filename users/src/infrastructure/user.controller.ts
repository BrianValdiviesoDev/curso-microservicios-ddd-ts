import { NextFunction, Request, Response } from 'express';
import { CreateUserDTO } from '../application/createUser.dto';
import { CreateUserUseCase } from '../application/createUser.useCase';
import { UserDbAdapter } from './userDb.adapter';
import { FindUserUseCase } from '../application/findUser.useCase';
import { UpdateUserUseCase } from '../application/updateUser.useCase';
import { DeleteUserUseCase } from '../application/deleteUse.useCase';
import { ListUserUseCase } from '../application/listUsers.useCase';
import { UserDto } from '../application/user.dto';

export const createUser = async (user: CreateUserDTO): Promise<UserDto> => {
	const userUseCase = new CreateUserUseCase(new UserDbAdapter());
	return await userUseCase.execute(user);
};

export const findUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userUseCase = new FindUserUseCase(new UserDbAdapter());
		const user = await userUseCase.execute(req.params.id);
		res.status(200).send(user);
		return;
	} catch (e) {
		next(e);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const createUserDTO = new CreateUserDTO(
			req.body.name,
			req.body.email,
			req.body.birth_date,
			req.body.car_license
		);
		const userUseCase = new UpdateUserUseCase(new UserDbAdapter());
		const updated = await userUseCase.execute(req.params.id, createUserDTO);
		res.status(200).send(updated);
		return;

	} catch (e) {
		next(e);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userUseCase = new DeleteUserUseCase(new UserDbAdapter());
		const deleted = await userUseCase.execute(req.params.id);
		res.status(204).send(deleted);
		return;

	} catch (e) {
		next(e);
	}
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userUseCase = new ListUserUseCase(new UserDbAdapter());
		const list = await userUseCase.execute();
		res.status(200).send(list);
		return;

	} catch (e) {
		next(e);
	}
};