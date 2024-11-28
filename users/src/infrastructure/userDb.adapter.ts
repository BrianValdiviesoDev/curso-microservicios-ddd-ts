import { User } from '../domain/user.entity';
import { IUser } from '../domain/user.interface';
import { UserDbPort } from '../domain/userDb.port';
import { UserMapper } from './user.mapper';
import UserModel from './user.schema';

export class UserDbAdapter implements UserDbPort {
	async findById(id: string): Promise<User | null> {
		const result = await UserModel.findOne({id});
		if (result) {
			return UserMapper.toDomain(result);
		}
		return null;
	}
	async create(user: IUser): Promise<User> {
		console.log('===================');
		console.log(user);
		const result = await UserModel.create(user);
		return UserMapper.toDomain(result);
	}
}
