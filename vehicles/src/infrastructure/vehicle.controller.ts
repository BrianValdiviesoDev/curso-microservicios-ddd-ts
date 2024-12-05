import { CreateVehicleHandler } from '../application/queries/createVehicle.handler';
import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { VehicleDbAdapter } from './vehicleDb.adapter';
import { CommandBus } from '../application/buses/command.bus';
import { Vehicle } from '../domain/vehicle.entity';
import { GetVehicleHandler } from '../application/queries/getVehicle.handler';
import { GetVehicleQuery } from '../application/queries/getVehicle.query';
import { NotFoundError } from '../errors/errorfactory';
import { CreateVehicleCommand } from '../application/commands/createVehicle.command';

export class VehicleController {
	constructor(
		private readonly commandBus: CommandBus,
	) { }

	async createVehicle(vehicle: CreateVehicleDTO): Promise<void> {
		const handler = new CreateVehicleHandler(new VehicleDbAdapter());
		await handler.execute(new CreateVehicleCommand(vehicle.licensePlate, vehicle.brand, vehicle.model, vehicle.kilometers));
	}

	async getVehicle(licensePlate: string): Promise<Vehicle> {
		const handler = new GetVehicleHandler(new VehicleDbAdapter());
		const vehicle = await handler.execute(new GetVehicleQuery(licensePlate));
		if (!vehicle) {
			throw new NotFoundError('Vehicle not found');
		}

		return vehicle;
	}
}

