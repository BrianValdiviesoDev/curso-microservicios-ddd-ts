import { VehicleMapper } from '../application/vehicle.mapper';
import { Vehicle } from '../domain/vehicle.entity';
import { IVehicle } from '../domain/vehicle.interface';
import { VehicleDbPort } from '../domain/vehicleDb.port';
import VehicleModel from './vehicle.schema';

export class VehicleDbAdapter implements VehicleDbPort {
	async create(vehicle: IVehicle): Promise<Vehicle> {
		const result = await VehicleModel.create(vehicle);
		return VehicleMapper.toDomain(result);
	}
}
