import { Model, Schema, Types, model } from 'mongoose';
import { FamilyDocument } from './family.interface';

const FamilySchema = new Schema<FamilyDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		members: [
			{
				type: Types.ObjectId,
				ref: 'User', // Referencia al modelo User
				required: true,
			},
		],
		vehicles: [
			{
				type: Types.ObjectId,
				ref: 'Vehicle', // Referencia al modelo Vehicle
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const FamilyModel: Model<FamilyDocument> = model('Family', FamilySchema);
export default FamilyModel;