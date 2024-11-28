import { Router } from 'express';
import { createUser } from '../infrastructure/user.controller';

const router = Router();
router.post('/', createUser);


export default router;