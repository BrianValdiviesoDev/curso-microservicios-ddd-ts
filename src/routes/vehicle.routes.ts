import { Router } from 'express';
import { createVehicle, deleteVehicle, getVehicle, listVehicles, updateVehicle } from '../controllers/vehicle.controller';

const router = Router();
router.post('/', createVehicle);
router.patch('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);
router.get('/', listVehicles);
router.get('/:id', getVehicle);

export default router;