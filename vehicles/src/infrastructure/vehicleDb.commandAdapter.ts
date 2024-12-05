import { VehicleMapper } from '../application/vehicle.mapper';
import { Vehicle } from '../domain/vehicle.entity';
import { IVehicle } from '../domain/vehicle.interface';
import { NotFoundError } from '../errors/errorfactory';
import InsuranceModel from './insurance.schema';
import { VehicleDbPort } from '../domain/vehicleDb.port';
import { MongoService } from '../framework/mongodb';
import { createVehicleModel, VehicleDocument } from './vehicle.schema';
import { Model } from 'mongoose';
import logger from '../framework/logger';

export class VehicleCommandDbAdapter implements VehicleDbPort {
	private vehicleModel: Model<VehicleDocument> | undefined;
	constructor() {
		const mongo = new MongoService();
		mongo.connectToCommandDb()
			.then((connection) => {
				this.vehicleModel = createVehicleModel(connection);
			})
			.catch((err) => {
				logger.error('Error connecting CommandBus:', err);
				throw new Error('Error connecting CommandBus');
			});
	}
	
	async addInsurance(vehicleId: string, insuranceId: string): Promise<Vehicle> {
		if (!this.vehicleModel) {
			throw new Error('VehicleModel is not created in CommandBus');
		}
		const insurance = await InsuranceModel.findOne({ insuranceId });
		if (!insurance) {
			throw new NotFoundError('Insurance not found');
		}
		const result = await this.vehicleModel.findOneAndUpdate({ vehicleId }, {
			$push:{insurances: insurance._id}
		},
		{ new: true });
		
		if (!result) {
			throw new NotFoundError('Vehicle not found');
		}
		return VehicleMapper.toDomain(result);
	}
	
	async create(vehicle: IVehicle): Promise<Vehicle> {
		if (!this.vehicleModel) {
			throw new Error('VehicleModel is not created in CommandBus');
		}
		const result = await this.vehicleModel.create(vehicle);
		return VehicleMapper.toDomain(result);
	}

	async findByLicensePlate(licensePlate: string): Promise<Vehicle> {
		throw new Error('This method is not allowed in CommandBus');
	}
}
