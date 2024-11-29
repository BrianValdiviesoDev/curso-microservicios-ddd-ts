import { UserDbPort } from '../domain/userDb.port';
import { CreateUserDTO } from './createUser.dto';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';

export class CreateUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (userDto: CreateUserDTO): Promise<UserDto> => {
		const user = UserMapper.toDomain(userDto);
		const result = await this.userDb.create(user);
		return UserMapper.toDto(result);
	};
}