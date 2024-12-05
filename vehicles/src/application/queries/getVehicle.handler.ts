import { VehicleDbPort } from '../../domain/vehicleDb.port';
import { GetVehicleQuery } from './getVehicle.query';
import { Vehicle } from '../../domain/vehicle.entity';

export class GetVehicleHandler {
	constructor(private readonly vehicleDb: VehicleDbPort) {}

	async execute(query: GetVehicleQuery): Promise<Vehicle | null> {
		return this.vehicleDb.findByLicensePlate(query.licensePlate);
	}
}
