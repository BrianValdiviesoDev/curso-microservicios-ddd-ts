import { NextFunction, Request, Response, Router } from 'express';
import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { VehicleController } from '../infrastructure/vehicle.controller';
import logger from '../framework/logger';

const router = Router();

const vehicleController = new VehicleController();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	logger.info('[VehicleRouter] - POST /');
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