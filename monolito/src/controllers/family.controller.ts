import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/errorfactory';
import { FamilyService } from '../services/family.service';
import { Types } from 'mongoose';


const createFamily = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		if (!req.body.name || !req.body.members) {
			throw new BadRequestError('Name and members are required');
		}
		const name = req.body.name;
		const members = req.body.members.map((member:string)=>new Types.ObjectId(member));
        
		const newFamily = await familyService.createFamily(name, members);
		if (!newFamily) {
			throw new Error('Error creating family');
		}
		res.status(201).send(newFamily);
	} catch (e) {
		next(e);
	}
    

};

const updateFamilyName = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const updated = await familyService.updateName(
			req.params.id,
			req.body.name,
		);
		if (!updated) {
			throw new NotFoundError('Family not found');
		}
		res.status(200).send(updated);
	} catch (e) {
		next(e);
	}

};

const addFamilyMember = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const memberId = req.body.memberId;
		if (!memberId) {
			throw new BadRequestError('memberId is required');
		}
		const updated = await familyService.addMember(
			req.params.id,
			new Types.ObjectId(memberId as string)
		);
		if (!updated) {
			throw new NotFoundError('Family not found');
		}
		res.status(200).send(updated);
	} catch (e) {
		next(e);
	}

};


const deleteFamily = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const deleted = await familyService.deleteFamily(req.params.id);
		if (deleted.deletedCount < 1) {
			throw new NotFoundError('Family not found');
		}
		res.status(200).send();
	} catch (e) {
		next(e);
	}
		

};

const listFamilies = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const families = await familyService.listFamilies();
		if (families.length < 1) {
			throw new NotFoundError('Families not found');
		}
		res.status(200).send(families);        
	} catch (e) {
		next(e);
	}
    

};

const getFamily = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const family = await familyService.getFamily(req.params.id);
		if (!family) {
			throw new NotFoundError('Family not found');
		}
		res.status(200).send(family);
	} catch (e) {
		next(e);
	}    
};

const addFamilyVehicle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const familyService = new FamilyService();
		const vehicleId = req.body.vehicleId;
		if (!vehicleId) {
			throw new BadRequestError('vehicleId is required');
		}
		const updated = await familyService.addVehicle(
			req.params.id,
			new Types.ObjectId(vehicleId as string)
		);
		if (!updated) {
			throw new NotFoundError('Family not found');
		}
		res.status(200).send(updated);
	} catch (e) {
		next(e);
	}
};

export {
	createFamily,
	updateFamilyName,
	addFamilyMember,
	deleteFamily,
	listFamilies,
	getFamily,
	addFamilyVehicle
};