import { VehicleDbPort } from '../domain/vehicleDb.port';
import { CreateVehicleDTO } from './createVehicle.dto';
import { VehicleDto } from './vehicle.dto';
import { VehicleMapper } from './vehicle.mapper';

export class CreateVehicleUseCase {
	constructor(
        private readonly vehicleDb: VehicleDbPort
	) { }
    
	public execute = async (vehicleDto: CreateVehicleDTO): Promise<VehicleDto> => {
		const vehicle = VehicleMapper.toDomain(vehicleDto);
		const result = await this.vehicleDb.create(vehicle);
		return VehicleMapper.toDto(result);
	};
}