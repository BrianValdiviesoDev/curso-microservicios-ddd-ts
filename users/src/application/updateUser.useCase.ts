import { UserDbPort } from '../domain/userDb.port';
import { NotFoundError } from '../errors/errorfactory';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';

export class UpdateUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (userId: string, user: Partial<UserDto>): Promise<UserDto> => {
		const updated = await this.userDb.updateById(userId, user);
		if (!updated) {
			throw new NotFoundError('User not found');
		}
		return UserMapper.toDto(updated);
	};
}