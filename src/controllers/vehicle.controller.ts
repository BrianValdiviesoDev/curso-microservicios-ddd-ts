import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/errorfactory';
import { VehicleService } from '../services/vehicle.service';


const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.body.name) {
			throw new BadRequestError('Name is required');
		}
		const vehicleService = new VehicleService();
		const newVehicle = await vehicleService.createVehicle(req.body);
		if (!newVehicle) {
			throw new Error('Error creating vehicle');
		}
		res.status(201).send(newVehicle);
	} catch (e) {
		next(e);
	}
    

};

const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const vehicleService = new VehicleService();
		const updated = await vehicleService.updateVehicle(
			req.params.id,
			req.body.vehicle,
		);
		if (!updated) {
			throw new NotFoundError('Vehicle not found');
		}
		res.status(200).send(updated);
	} catch (e) {
		next(e);
	}

};


const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const vehicleService = new VehicleService();
		const deleted = await vehicleService.deleteVehicle(req.params.id);
		if (deleted.deletedCount < 1) {
			throw new NotFoundError('Vehicle not found');
		}
		res.status(200).send();
	} catch (e) {
		next(e);
	}
		

};

const listVehicles = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const vehicleService = new VehicleService();
		const vehicles = await vehicleService.listVehicles();
		if (vehicles.length < 1) {
			throw new NotFoundError('Vehicles not found');
		}
		res.status(200).send(vehicles);        
	} catch (e) {
		next(e);
	}
    

};

const getVehicle = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const vehicleService = new VehicleService();
		const vehicle = await vehicleService.getVehicle(req.params.id);
		if (!vehicle) {
			throw new NotFoundError('Vehicle not found');
		}
		res.status(200).send(vehicle);
	} catch (e) {
		next(e);
	}    
};



export {
	createVehicle,
	updateVehicle,
	deleteVehicle,
	listVehicles,
	getVehicle,
};