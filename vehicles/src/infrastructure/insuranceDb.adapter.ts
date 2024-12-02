import { InsuranceMapper } from '../application/insurance.mapper';
import { Insurance } from '../domain/insurance.entity';
import { IInsurance } from '../domain/insurance.interface';
import { InsuranceDbPort } from '../domain/insuranceDb.port';
import InsuranceModel from './insurance.schema';

export class InsuranceDbAdapter implements InsuranceDbPort {
	async create(insurance: IInsurance): Promise<Insurance> {
		const result = await InsuranceModel.create(insurance);
		return InsuranceMapper.toDomain(result);
	}
}
