import { UserDbPort } from '../domain/userDb.port';
import { NotFoundError } from '../errors/errorfactory';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';

export class FindUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (userId: string): Promise<UserDto> => {
		const user = await this.userDb.findById(userId);
		if (!user) {
			throw new NotFoundError('User not found');
		}
		return UserMapper.toDto(user);
	};
}