import { NextFunction, Request, Response, Router } from 'express';
import { CreateInsuranceDTO } from '../application/createInsurance.dto';
import { createInsurance } from '../infrastructure/insurance.controller';

const router = Router();
router.post('/:vehicleId', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const createInsuranceDto = new CreateInsuranceDTO(
			req.body.startDate,
			req.body.endDate,
			req.body.amount,
			req.body.company
		);
		const vehicle = await createInsurance(req.params.vehicleId, createInsuranceDto);
		res.status(201).send(vehicle);
		return;
	} catch (e) {
		next(e);
	}
});

export default router;