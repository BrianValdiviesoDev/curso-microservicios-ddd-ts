import { DeleteResult, Types } from "mongoose";
import { Rol, User, UserDocument } from "../entities/user.interface";
import UserModel from "../entities/user.schema";

export class UserService {
    async create(user:User){
        return await UserModel.create(user)
    }

    async update(
        _id: string,
        user: Partial<User>
    ){
        return await UserModel.findByIdAndUpdate(
            new Types.ObjectId(_id),
            { $set: user },
            { new: true}
          );
    }

    async deleteUser(_id: string, requestRol: Rol): Promise<DeleteResult> {
        if (requestRol!==Rol.SUPERADMIN) {
            throw new Error('Not allowed')
        }
        return await UserModel.deleteOne({ _id: new Types.ObjectId(_id) });            
	}

	async listUsers(): Promise<UserDocument[]> {
		return await UserModel.find({});
	}

	async getUser(_id: string): Promise<UserDocument | null> {
		return await UserModel.findById(new Types.ObjectId(_id));
	}
}