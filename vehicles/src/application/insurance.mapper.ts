import { Insurance } from '../domain/insurance.entity';
import { CreateInsuranceDTO } from './createInsurance.dto';
import { InsuranceDto } from './insurance.dto';

export class InsuranceMapper {
	static toDomain(dto: CreateInsuranceDTO): Insurance {
		return new Insurance(
			dto.startDate,
			dto.endDate,
			dto.amount,
			dto.company,
		);
	}

	static toDto(insurance: Insurance): InsuranceDto {
		return new InsuranceDto(
			insurance.insuranceId,
			insurance.startDate,
			insurance.endDate,
			insurance.amount,
			insurance.company
		);
	}

	static fromInfra(dto: InsuranceDto): Insurance {
		return new Insurance(
			dto.startDate,
			dto.endDate,
			dto.amount,
			dto.company,
			dto.insuranceId,
		);
	}
}
