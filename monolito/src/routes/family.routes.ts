import { Router } from 'express';
import { addFamilyMember, addFamilyVehicle, createFamily, deleteFamily, getFamily, listFamilies, updateFamilyName } from '../controllers/family.controller';

const router = Router();
router.post('/', createFamily);
router.patch('/:id', updateFamilyName);
router.put('/:id/member', addFamilyMember);
router.delete('/:id', deleteFamily);
router.get('/', listFamilies);
router.get('/:id', getFamily);
router.put('/:id/vehicle', addFamilyVehicle);

export default router;