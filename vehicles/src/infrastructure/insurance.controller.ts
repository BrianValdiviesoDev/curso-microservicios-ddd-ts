import { CreateInsuranceDTO } from '../application/createInsurance.dto';
import { CreateInsuranceUseCase } from '../application/createInsurance.useCase';
import { InsuranceDto } from '../application/insurance.dto';
import { InsuranceDbAdapter } from './insuranceDb.adapter';
import { VehicleDbAdapter } from './vehicleDb.adapter';

export const createInsurance = async (vehicleId:string, insurance: CreateInsuranceDTO): Promise<InsuranceDto> => {
	const insuranceUseCase = new CreateInsuranceUseCase(new InsuranceDbAdapter(), new VehicleDbAdapter());
	return await insuranceUseCase.execute(vehicleId, insurance);
};
