import { DeleteResult, Types } from 'mongoose';
import { Vehicle, VehicleDocument } from '../entitites/vehicle.interface';
import VehicleModel from '../entitites/vehicle.schema';


export class VehicleService {
	async createVehicle(user: Vehicle): Promise<VehicleDocument> {
		return await VehicleModel.create(user);
	}

	async updateVehicle(
		_id: string,
		vehicle: Partial<Vehicle>
	  ): Promise<VehicleDocument | null> {
		return await VehicleModel.findByIdAndUpdate(
		  new Types.ObjectId(_id),
		  { $set: vehicle },
		  { new: true}
		);
	  }

	async deleteVehicle(_id: string): Promise<DeleteResult> {
		return await VehicleModel.deleteOne({ _id: new Types.ObjectId(_id) });
	}

	async listVehicles(): Promise<VehicleDocument[]> {
		return await VehicleModel.find({});
	}

	async getVehicle(_id: string): Promise<VehicleDocument | null> {
		return await VehicleModel.findById(new Types.ObjectId(_id));
	}
}