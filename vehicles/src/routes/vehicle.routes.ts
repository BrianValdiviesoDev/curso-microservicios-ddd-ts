import { NextFunction, Request, Response, Router } from 'express';
import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { VehicleController } from '../infrastructure/vehicle.controller';
import { CommandBus } from '../application/buses/command.bus';
import { CreateVehicleHandler } from '../application/queries/createVehicle.handler';
import { VehicleDbAdapter } from '../infrastructure/vehicleDb.adapter';
import { CreateVehicleCommand } from '../application/commands/createVehicle.command';
import { QueryBus } from '../application/buses/query.bus';
import { GetVehicleQuery } from '../application/queries/getVehicle.query';
import { GetVehicleHandler } from '../application/queries/getVehicle.handler';

const router = Router();
const commandBus = new CommandBus();
commandBus.register(CreateVehicleCommand.name, new CreateVehicleHandler(new VehicleDbAdapter()));


const queryBus = new QueryBus();
queryBus.register(GetVehicleQuery.name, new GetVehicleHandler(new VehicleDbAdapter()));

const vehicleController = new VehicleController(commandBus);

router.post('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const createVehicleDto = new CreateVehicleDTO(
			req.body.licensePlate,
			req.body.brand,
			req.body.model,
			req.body.kilometers
		);
		const vehicle = await vehicleController.createVehicle(createVehicleDto);
		res.status(201).send(vehicle);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/licensePlate/:licensePlate', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const vehicle = await vehicleController.getVehicle(req.params.licensePlate);
		res.status(200).send(vehicle);
		return;
	} catch (e) {
		next(e);
	}
});

export default router;