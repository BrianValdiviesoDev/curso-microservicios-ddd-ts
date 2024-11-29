import { Router } from 'express';
import { createUser, updateUser, deleteUser, listUsers, getUser } from '../controllers/user.controller';

const router = Router();
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);
router.get('/:id', getUser);

export default router;