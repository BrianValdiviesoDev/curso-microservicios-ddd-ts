import { InsuranceDbPort } from '../domain/insuranceDb.port';
import { VehicleDbPort } from '../domain/vehicleDb.port';
import { AddInsuranceToVehicleUseCase } from './addInsuranceToVehicle.useCase';
import { CreateInsuranceDTO } from './createInsurance.dto';
import { InsuranceDto } from './insurance.dto';
import { InsuranceMapper } from './insurance.mapper';

export class CreateInsuranceUseCase {
	constructor(
        private readonly insuranceDb: InsuranceDbPort,
        private readonly vehicleDb: VehicleDbPort
	) { }
    
	public execute = async (vehicleId: string, dto:CreateInsuranceDTO): Promise<InsuranceDto> => {
		const insurance = InsuranceMapper.toDomain(dto);
		const insuranceSaved = await this.insuranceDb.create(insurance);
        
		const addInsuranceToVehicle = new AddInsuranceToVehicleUseCase(this.vehicleDb);
		await addInsuranceToVehicle.execute(vehicleId, insuranceSaved.insuranceId);
		
		return InsuranceMapper.toDto(insuranceSaved);
	};
}