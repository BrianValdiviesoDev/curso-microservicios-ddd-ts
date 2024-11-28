import { Router } from 'express';
import { createUser, findUser } from '../infrastructure/user.controller';

const router = Router();
router.post('/', createUser);
router.get('/:id', findUser);

export default router;