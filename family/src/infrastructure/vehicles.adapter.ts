import { IVehicle } from '../domain/vehicle.interface';
import { VehiclesPort } from '../domain/vehicles.port';
import logger from '../framework/logger';

export class VehiclesAdapter implements VehiclesPort{
	constructor() {
		if (!process.env.MICRO_VEHICLES_URL) {
			throw new Error('MICRO_VEHICLES_URL is not set as environment variable');
		}
	}
	async getById(vehicleId: string): Promise<IVehicle> {
		const response = await fetch(`${process.env.MICRO_VEHICLES_URL}/${vehicleId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}); 
		if (response.status == 200) {
			return await response.json() as IVehicle;
		}
		logger.error(`users-micro response ${response.status}`);
		throw new Error('Cannot get user from users-micro');
	}

}