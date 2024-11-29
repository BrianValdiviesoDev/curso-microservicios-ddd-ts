import { User } from '../domain/user.entity';
import { IUser } from '../domain/user.interface';
import { UserDbPort } from '../domain/userDb.port';
import { UserMapper } from './user.mapper';
import UserModel from './user.schema';

export class UserDbAdapter implements UserDbPort {
	async listAll(): Promise<User[]> {
		const list = await UserModel.find({});
		return list.map((user)=>UserMapper.toDomain(user));
	}
	async deleteById(userId: string): Promise<boolean> {
		const deleted = await UserModel.findOneAndDelete({ userId });
		return !!deleted;
	}
	async updateById(userId: string, user: Partial<User>): Promise<User | null> {
		const updated = await UserModel.findOneAndUpdate(
			{ userId },
			{ $set: user },
			{ new: true }
		);
		if (updated) {
			return UserMapper.toDomain(updated);			
		}
		return null;
	}
	async findById(userId: string): Promise<User | null> {
		const result = await UserModel.findOne({userId});
		if (result) {
			return UserMapper.toDomain(result);
		}
		return null;
	}
	async create(user: IUser): Promise<User> {
		const result = await UserModel.create(user);
		return UserMapper.toDomain(result);
	}
}
