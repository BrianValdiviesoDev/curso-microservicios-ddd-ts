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
		const user = await createUser(createUserDTO);
		res.status(201).send(user);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/:id', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const user = await findUser(req.params.id);
		res.status(200).send(user);
		return;
	} catch (e) {
		next(e);
	}
});

router.get('/', async (req:Request, res:Response, next:NextFunction) => {
	try {
		const users = await listUsers();
		res.status(200).send(users);
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
		const users = await updateUser(req.params.id, createUserDTO);
		res.status(200).send(users);
		return;
	} catch (e) {
		next(e);
	}
});

router.delete('/:id', async (req:Request, res:Response, next:NextFunction) => {
	try {
		await deleteUser(req.params.id);
		res.status(204).send();
		return;
	} catch (e) {
		next(e);
	}
});

export default router;