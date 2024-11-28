import { IUser, User } from '../domain/user.entity';
import { UserDbPort } from '../domain/userDb.port';
import UserModel from './user.schema';

export class UserDbAdapter implements UserDbPort {
	async create(user: IUser): Promise<User> {
		const result = await UserModel.create(user);
		return new User(
			result.name,
			result.email,
			result.rol,
			result.birth_date,
			result.car_license
		);
	}
}
