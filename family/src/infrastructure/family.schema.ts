import { Model, Schema, model } from 'mongoose';
import { IFamily } from '../domain/family.interface';

export interface FamilyDocument extends IFamily, Document {}
  
const FamilySchema = new Schema<FamilyDocument>(
	{
		familyId: {
			type: String,
			required: true,
			unique: true,
			index:true
		},
		name: {
			type: String,
			required: true,
		},
		members: {
			type: [String],
		},
		vehicles: {
			type: [String],
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const FamilyModel: Model<FamilyDocument & Document> = model('Family', FamilySchema);
export default FamilyModel;