import { IUser } from '../domain/user.interface';
import { UsersPort } from '../domain/users.port';
import logger from '../framework/logger';
import { UserMapper } from './user.mapper';

export class UsersAdapter implements UsersPort{
	constructor() {
		if (!process.env.MICRO_USERS_URL) {
			throw new Error('MICRO_USERS_URL is not set as environment variable');
		}
	}
	async getById(userId: string): Promise<IUser> {
		const response = await fetch(`${process.env.MICRO_USERS_URL}/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}); 
		if (response.status == 200) {
			const user = await response.json();
			return UserMapper.fromApi(user);
		}
		logger.error(`users-micro response ${response.status}`);
		throw new Error('Cannot get user from users-micro');
	}

}