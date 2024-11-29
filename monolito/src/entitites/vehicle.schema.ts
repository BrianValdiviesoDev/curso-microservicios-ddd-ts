import { Model, Schema, model } from 'mongoose';
import { VehicleDocument } from './vehicle.interface';

const VehicleSchema = new Schema<VehicleDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
		},
		license_plate: {
			type: String,
		},
		frame_number: {
			type: String,
		},
		registration_date: {
			type: Date,
		}
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const VehicleModel: Model<VehicleDocument> = model('Vehicle', VehicleSchema);
export default VehicleModel;