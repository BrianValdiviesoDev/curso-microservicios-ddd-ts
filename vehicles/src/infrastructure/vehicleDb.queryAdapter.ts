import { VehicleMapper } from '../application/vehicle.mapper';
import { Vehicle } from '../domain/vehicle.entity';
import { IVehicle } from '../domain/vehicle.interface';
import { createVehicleModel, VehicleDocument } from './vehicle.schema';
import { NotFoundError } from '../errors/errorfactory';
import { VehicleDbPort } from '../domain/vehicleDb.port';
import { Model } from 'mongoose';
import { MongoService } from '../framework/mongodb';
import logger from '../framework/logger';

export class VehicleQueryDbAdapter implements VehicleDbPort {
	private vehicleModel: Model<VehicleDocument> | undefined;
	constructor() {
		const mongo = new MongoService();
		mongo.connectToQueryDb()
			.then((connection) => {
				this.vehicleModel = createVehicleModel(connection);
			})
			.catch((err) => {
				logger.error('Error connecting CommandBus:', err);
				throw new Error('Error connecting CommandBus');
			});
	}
	async addInsurance(vehicleId: string, insuranceId: string): Promise<Vehicle> {
		throw new Error('This method is not allowed in QueryBus');
	}
	async create(vehicle: IVehicle): Promise<Vehicle> {
		throw new Error('This method is not allowed in QueryBus');
	}

	async findByLicensePlate(licensePlate: string): Promise<Vehicle> {
		if (!this.vehicleModel) {
			throw new Error('VehicleModel is not created in CommandBus');
		}
		const result = await this.vehicleModel.findOne({ licensePlate }).populate('insurances');
		if (!result) {
			throw new NotFoundError('Vehicle not found');
		}
		return VehicleMapper.fromInfra(result);
	}
}
