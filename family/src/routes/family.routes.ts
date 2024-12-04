import { NextFunction, Request, Response, Router } from 'express';
import { CreateFamilyDTO } from '../application/createFamily.dto';
import { createFamily } from '../infrastructure/family.controller';

const router = Router();
router.post('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const dto = new CreateFamilyDTO(
			req.body.name,
			req.body.userId,
		);
		const response = await createFamily(dto);
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});
export default router;