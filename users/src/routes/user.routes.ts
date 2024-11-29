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
router.get('/:id', findUser);
router.get('/', listUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;