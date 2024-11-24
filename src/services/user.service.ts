import UserModel from '../entitites/user.schema';
import { User, UserDocument } from '../entitites/user.interface';
import { DeleteResult, Types } from 'mongoose';


export class UserService {
	async createUser(user: User): Promise<UserDocument> {
		return await UserModel.create(user);
	}

	async updateUser(
		_id: string,
		user: Partial<User>
	  ): Promise<UserDocument | null> { // No debe haber comas erróneas o espacios mal colocados
		const updatedUser = await UserModel.findByIdAndUpdate(
		  new Types.ObjectId(_id),
		  { $set: user },
		  { new: true}
		);
	  
		return updatedUser;
	  }

	async deleteUser(_id: string): Promise<DeleteResult> {
		return await UserModel.deleteOne({ _id: new Types.ObjectId(_id) });
	}

	async listUsers(): Promise<UserDocument[]> {
		return await UserModel.find({});
	}

	async getUser(_id: string): Promise<UserDocument | null> {
		return await UserModel.findById(new Types.ObjectId(_id));
	}
}