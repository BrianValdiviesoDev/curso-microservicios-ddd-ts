import { NextFunction, Request, Response, Router } from 'express';
import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { createVehicle, findByLicensePlate } from '../infrastructure/vehicle.controller';

const router = Router();
router.post('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const createVehicleDto = new CreateVehicleDTO(
			req.body.licensePlate,
			req.body.brand,
			req.body.model,
			req.body.kilometers
		);
		const vehicle = await createVehicle(createVehicleDto);
		res.status(201).send(vehicle);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/licensePlate/:licensePlate', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const vehicle = await findByLicensePlate(req.params.licensePlate);
		res.status(200).send(vehicle);
		return;
	} catch (e) {
		next(e);
	}
});

export default router;