import { VehicleDbPort } from '../../domain/vehicleDb.port';
import logger from '../../framework/logger';
import { CreateVehicleCommand } from '../commands/createVehicle.command';
import { VehicleMapper } from '../vehicle.mapper';


export class CreateVehicleHandler {
	constructor(private readonly vehicleDb: VehicleDbPort) {}

	async execute(command: CreateVehicleCommand): Promise<void> {
		logger.info(`[CreateVehicleHandler] - execute ${command.licensePlate.toString()}`);
		const vehicle = VehicleMapper.toDomain(command);
		await this.vehicleDb.create(vehicle);
	}
}
