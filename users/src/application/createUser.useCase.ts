import { User } from '../domain/user.entity';
import { UserDbPort } from '../domain/userDb.port';
import { CreateUserDTO } from './createUser.dto';
import { UserMapper } from './user.mapper';

export class CreateUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (userDto: CreateUserDTO): Promise<User> => {
		return await this.userDb.create(UserMapper.toDomain(userDto));
	};
}