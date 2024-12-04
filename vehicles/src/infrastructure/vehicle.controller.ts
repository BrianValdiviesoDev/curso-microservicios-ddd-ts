import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { CreateVehicleUseCase } from '../application/createVehicle.useCase';
import { FindVehicleByLicensePlateUseCase } from '../application/findVehicleByLicensePlate.useCase';
import { VehicleDto } from '../application/vehicle.dto';
import { VehicleDbAdapter } from './vehicleDb.adapter';

export const createVehicle = async (vehicle: CreateVehicleDTO): Promise<VehicleDto> => {
	const vehicleUseCase = new CreateVehicleUseCase(new VehicleDbAdapter());
	return await vehicleUseCase.execute(vehicle);
};

export const findByLicensePlate = async (licensePlate: string): Promise<VehicleDto> => {
	const vehicleUseCase = new FindVehicleByLicensePlateUseCase(new VehicleDbAdapter());
	return await vehicleUseCase.execute(licensePlate);
};
