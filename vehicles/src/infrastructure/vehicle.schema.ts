import { Connection, Model, Schema, Types } from 'mongoose';
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
			}
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
export const createVehicleModel = (connection: Connection): Model<VehicleDocument> => {
	return connection.model<VehicleDocument>('Vehicle', VehicleSchema);
};