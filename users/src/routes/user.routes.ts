import { NextFunction, Request, Response, Router } from 'express';
import { createUser, deleteUser, findUser, listUsers, updateUser } from '../infrastructure/user.controller';
import { CreateUserDTO } from '../application/createUser.dto';

const router = Router();
router.post('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const createUserDTO = new CreateUserDTO(
			req.body.name,
			req.body.email,
			req.body.birth_date,
			req.body.car_license
		);
		const response = await createUser(createUserDTO);
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const response = await findUser(req.params.id);
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const response = await listUsers();
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});

router.put('/:id', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const createUserDTO = new CreateUserDTO(
			req.body.name,
			req.body.email,
			req.body.birth_date,
			req.body.car_license
		);
		const response = await updateUser(req.params.id, createUserDTO);
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const response = await deleteUser(req.params.id);
		res.status(response.statusCode).send(response.data);
		return;
	} catch (e) {
		next(e);
	}
});

export default router;