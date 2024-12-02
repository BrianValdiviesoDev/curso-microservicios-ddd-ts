import { CreateVehicleDTO } from '../application/createVehicle.dto';
import { CreateVehicleUseCase } from '../application/createVehicle.useCase';
import { VehicleDto } from '../application/vehicle.dto';
import { VehicleDbAdapter } from './vehicleDb.adapter';

export const createVehicle = async (vehicle: CreateVehicleDTO): Promise<VehicleDto> => {
	const vehicleUseCase = new CreateVehicleUseCase(new VehicleDbAdapter());
	console.log('vehi', vehicle);
	return await vehicleUseCase.execute(vehicle);
};
