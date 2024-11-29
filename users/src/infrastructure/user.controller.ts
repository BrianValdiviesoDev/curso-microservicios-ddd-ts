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

export const findUser = async (id:string) => {
	const userUseCase = new FindUserUseCase(new UserDbAdapter());
	return await userUseCase.execute(id);
};

export const updateUser = async (id:string, user:CreateUserDTO) => {
	const userUseCase = new UpdateUserUseCase(new UserDbAdapter());
	return await userUseCase.execute(id, user);
};

export const deleteUser = async (id:string) => {
	const userUseCase = new DeleteUserUseCase(new UserDbAdapter());
	return await userUseCase.execute(id);
};

export const listUsers = async () => {
	const userUseCase = new ListUserUseCase(new UserDbAdapter());
	return await userUseCase.execute();
};