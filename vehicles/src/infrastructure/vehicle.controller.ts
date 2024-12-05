import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { VehicleDbAdapter } from './vehicleDb.adapter';
import { CommandBus } from '../application/buses/command.bus';
import { Vehicle } from '../domain/vehicle.entity';
import { GetVehicleHandler } from '../application/queries/getVehicle.handler';
import { GetVehicleQuery } from '../application/queries/getVehicle.query';
import { NotFoundError } from '../errors/errorfactory';
import { CreateVehicleCommand } from '../application/commands/createVehicle.command';
import logger from '../framework/logger';
import { QueryBus } from '../application/buses/query.bus';
import { CreateVehicleHandler } from '../application/commands/createVehicle.handler';

export class VehicleController {
	private commandBus: CommandBus;
	constructor() {
		logger.info('[VehicleController] - Initializing CommandBus');
		this.commandBus = new CommandBus();
		this.commandBus.register(CreateVehicleCommand.name, new CreateVehicleHandler(new VehicleDbAdapter()));

		this.commandBus.printCommands();

		const queryBus = new QueryBus();
		queryBus.register(GetVehicleQuery.name, new GetVehicleHandler(new VehicleDbAdapter()));

	 }

	async createVehicle(vehicle: CreateVehicleDTO): Promise<void> {
		logger.info('[VehicleController] - CreateVehicle');
		await this.commandBus.execute(new CreateVehicleCommand(vehicle.licensePlate, vehicle.brand, vehicle.model, vehicle.kilometers));
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

