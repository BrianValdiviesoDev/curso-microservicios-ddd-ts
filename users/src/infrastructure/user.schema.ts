import { Model, Schema, model } from 'mongoose';
import { IUser } from '../domain/user.interface';

export interface UserDocument extends IUser, Document {}
  
const UserSchema = new Schema<UserDocument>(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
			index:true
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		birth_date: {
			type: Date,
			required: false,
		},
		rol: {
			type: [String],
			required: false
		},
		car_license: {
			type: String,
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const UserModel: Model<UserDocument & Document> = model('User', UserSchema);
export default UserModel;