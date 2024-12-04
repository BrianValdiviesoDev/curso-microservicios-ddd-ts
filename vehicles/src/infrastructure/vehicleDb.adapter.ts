import { VehicleMapper } from '../application/vehicle.mapper';
import { Vehicle } from '../domain/vehicle.entity';
import { IVehicle } from '../domain/vehicle.interface';
import { VehicleDbPort } from '../domain/vehicleDb.port';
import VehicleModel from './vehicle.schema';
import { NotFoundError } from '../errors/errorfactory';
import InsuranceModel from './insurance.schema';

export class VehicleDbAdapter implements VehicleDbPort {
	async addInsurance(vehicleId: string, insuranceId: string): Promise<Vehicle> {
		const insurance = await InsuranceModel.findOne({ insuranceId });
		if (!insurance) {
			throw new NotFoundError('Insurance not found');
		}
		const result = await VehicleModel.findOneAndUpdate({ vehicleId }, {
			$push:{insurances: insurance._id}
		},
		{ new: true });
		
		if (!result) {
			throw new NotFoundError('Vehicle not found');
		}
		return VehicleMapper.toDomain(result);
	}
	async create(vehicle: IVehicle): Promise<Vehicle> {
		const result = await VehicleModel.create(vehicle);
		return VehicleMapper.toDomain(result);
	}
}
