import { Model, Schema, model } from 'mongoose';
import { UserDocument } from './user.interface';

const UserSchema = new Schema<UserDocument>(
	{
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
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const UserModel: Model<UserDocument> = model('User', UserSchema);
export default UserModel;