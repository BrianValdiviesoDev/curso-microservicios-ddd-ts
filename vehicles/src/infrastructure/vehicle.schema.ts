import { Model, Schema, Types, model } from 'mongoose';
import { IVehicle } from '../domain/vehicle.interface';

export interface VehicleDocument extends IVehicle, Document {}
  
const VehicleSchema = new Schema<VehicleDocument>(
	{
		vehicleId: {
			type: String,
			required: true,
			unique: true,
			index:true
		},
		brand: {
			type: String,
		},
		model: {
			type: String,
		},
		licensePlate: {
			type: String,
			unique: true,
			index:true,
			required: false,
		},
		kilometers: {
			type: Number,
		},
		insurances: [
			{
				type: Types.ObjectId,
				ref: 'Insurance',
			},
		],
		itv:[
			{
				type: Types.ObjectId,
				ref: 'Itv',
			},
		],
		checkups: [
			{
				type: Types.ObjectId,
				ref: 'Checkups',
			},
		]
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const VehicleModel: Model<VehicleDocument & Document> = model('Vehicle', VehicleSchema);
export default VehicleModel;