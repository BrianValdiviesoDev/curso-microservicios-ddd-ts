import { CreateUserDTO } from '../application/createUser.dto';
import { CreateUserUseCase } from '../application/createUser.useCase';
import { UserDbAdapter } from './userDb.adapter';
import { FindUserUseCase } from '../application/findUser.useCase';
import { UpdateUserUseCase } from '../application/updateUser.useCase';
import { DeleteUserUseCase } from '../application/deleteUse.useCase';
import { ListUserUseCase } from '../application/listUsers.useCase';
import { UserHttpResponseDto } from '../infrastructure/user.dto';
import { EventRabbitAdapter } from './event.adapter';
import { RefreshDataUserUseCase } from '../application/refreshData.userCase';

const rabbitAdapter = new EventRabbitAdapter();
rabbitAdapter.connect();

export const createUser = async (user: CreateUserDTO): Promise<UserHttpResponseDto> => {
	const userUseCase = new CreateUserUseCase(new UserDbAdapter(), rabbitAdapter);
	const created = await userUseCase.execute(user);
	return new UserHttpResponseDto(201, created);
};

export const findUser = async (id:string) => {
	const userUseCase = new FindUserUseCase(new UserDbAdapter());
	const user = await userUseCase.execute(id);
	return new UserHttpResponseDto(200, user);
};

export const updateUser = async (id:string, user:CreateUserDTO) => {
	const userUseCase = new UpdateUserUseCase(new UserDbAdapter());
	const updated = await userUseCase.execute(id, user);
	return new UserHttpResponseDto(200, updated);
};

export const deleteUser = async (id:string) => {
	const userUseCase = new DeleteUserUseCase(new UserDbAdapter());
	await userUseCase.execute(id);
	return new UserHttpResponseDto(204);
};

export const listUsers = async () => {
	const userUseCase = new ListUserUseCase(new UserDbAdapter());
	const list = await userUseCase.execute();
	return new UserHttpResponseDto(200, list);
};

export const refreshData = async () => {
	const userUseCase = new RefreshDataUserUseCase(new UserDbAdapter(), rabbitAdapter);
	await userUseCase.execute();
	return new UserHttpResponseDto(200);
};