import { Model, Schema, model } from 'mongoose';
import { IInsurance } from '../domain/insurance.interface';

export interface InsuranceDocument extends IInsurance, Document {}
  
const InsuranceSchema = new Schema<InsuranceDocument>(
	{
		insuranceId: {
			type: String,
			required: true,
			unique: true,
			index:true
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		amount: {
			type: Number,
		},
		company: {
			type: String,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const InsuranceModel: Model<InsuranceDocument & Document> = model('Insurance', InsuranceSchema);
export default InsuranceModel;