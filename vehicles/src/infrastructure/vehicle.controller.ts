import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { CommandBus } from '../application/buses/command.bus';
import { Vehicle } from '../domain/vehicle.entity';
import { GetVehicleHandler } from '../application/queries/getVehicle.handler';
import { GetVehicleQuery } from '../application/queries/getVehicle.query';
import { CreateVehicleCommand } from '../application/commands/createVehicle.command';
import logger from '../framework/logger';
import { QueryBus } from '../application/buses/query.bus';
import { CreateVehicleHandler } from '../application/commands/createVehicle.handler';
import { VehicleCommandDbAdapter } from './vehicleDb.commandAdapter';
import { VehicleQueryDbAdapter } from './vehicleDb.queryAdapter';

export class VehicleController {
	private commandBus: CommandBus;
	private queryBus: QueryBus;
	constructor() {
		logger.info('[VehicleController] - Initializing CommandBus');
		this.commandBus = new CommandBus();
		this.commandBus.register(CreateVehicleCommand.name, new CreateVehicleHandler(new VehicleCommandDbAdapter()));
		this.commandBus.printCommands();

		this.queryBus = new QueryBus();
		this.queryBus.register(GetVehicleQuery.name, new GetVehicleHandler(new VehicleQueryDbAdapter()));

	 }

	async createVehicle(vehicle: CreateVehicleDTO): Promise<void> {
		logger.info('[VehicleController] - CreateVehicle');
		await this.commandBus.execute(new CreateVehicleCommand(vehicle.licensePlate, vehicle.brand, vehicle.model, vehicle.kilometers));
	}

	async getVehicle(licensePlate: string): Promise<Vehicle> {
		logger.info('[VehicleController] - GetVehicle');
		return await this.queryBus.execute(new GetVehicleQuery(licensePlate));
	}
}

