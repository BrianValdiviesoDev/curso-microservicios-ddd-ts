import { Model, Schema, model } from 'mongoose';
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
				type: String,
			},
		],
		itv:[
			{
				type: String,
			},
		],
		checkups: [
			{
				type: String,
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