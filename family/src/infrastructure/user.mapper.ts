import { IUser } from '../domain/user.interface';
import { UserApiResponse } from './user.interface';

export class UserMapper{
	static fromApi(user: UserApiResponse): IUser{
		return {
			userId: user.userId,
			name: user.name,
			email: user.email,
			birth_date: user.birth_date,
			car_license: user.car_license
		};
	}
}