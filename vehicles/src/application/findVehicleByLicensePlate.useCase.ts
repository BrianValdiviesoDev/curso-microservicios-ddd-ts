import { VehicleDbPort } from '../domain/vehicleDb.port';
import { VehicleDto } from './vehicle.dto';
import { VehicleMapper } from './vehicle.mapper';

export class FindVehicleByLicensePlateUseCase {
	constructor(
        private readonly vehicleDb: VehicleDbPort
	) { }
    
	public execute = async (licensePlate: string): Promise<VehicleDto> => {
		const result = await this.vehicleDb.findByLicensePlate(licensePlate);
		const vehicle = VehicleMapper.toDto(result);
		console.log(vehicle);
		return vehicle;
	};
}