import { VehicleDbPort } from '../domain/vehicleDb.port';
import { VehicleDto } from './vehicle.dto';
import { VehicleMapper } from './vehicle.mapper';

export class AddInsuranceToVehicleUseCase {
	constructor(
        private readonly vehicleDb: VehicleDbPort
	) { }
    
	public execute = async (vehicleId: string, insuranceId:string): Promise<VehicleDto> => {
		const result = await this.vehicleDb.addInsurance(vehicleId, insuranceId);
		return VehicleMapper.toDto(result);
	};
}