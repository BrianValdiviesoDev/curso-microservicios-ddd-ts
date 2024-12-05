import { VehicleDbPort } from '../../domain/vehicleDb.port';
import { CreateVehicleCommand } from '../commands/createVehicle.command';
import { VehicleMapper } from '../vehicle.mapper';


export class CreateVehicleHandler {
	constructor(private readonly vehicleDb: VehicleDbPort) {}

	async execute(command: CreateVehicleCommand): Promise<void> {
		const vehicle = VehicleMapper.toDomain(command);
		await this.vehicleDb.create(vehicle);
	}
}
