import { UserDbPort } from '../domain/userDb.port';
import { NotFoundError } from '../errors/errorfactory';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';

export class ListUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (): Promise<UserDto[]> => {
		const users = await this.userDb.listAll();
		if (users.length < 1) {
			throw new NotFoundError('Users not found');
		}
		return users.map((user) => UserMapper.toDto(user));
	};
}