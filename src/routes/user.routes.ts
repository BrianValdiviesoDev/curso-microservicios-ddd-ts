import { Router } from 'express';
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../controllers/user.controller';

const router = Router();
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);
router.get('/:uuid', getUser);

export default router;