import { Family } from '../domain/family.entity';
import { IFamily } from '../domain/family.interface';
import { IUser } from '../domain/user.interface';
import { IVehicle } from '../domain/vehicle.interface';
import { CreateFamilyDTO } from './createFamily.dto';
import { FamilyDto } from './family.dto';

export class FamilyMapper {
	// Mapeo de entrada a dominio
	static fromCreate(dto: CreateFamilyDTO): Family {
		return new Family(
			dto.name,
			[dto.userId],
			[]
		);
	}

	static fromInfra(dto: IFamily): Family {
		return new Family(
			dto.name,
			dto.members,
			dto.vehicles
		);
	}

	// Mapeo de salida a infra
	static toDto(family: Family, members?:IUser[], vehicles?:IVehicle[]): FamilyDto {
		return new FamilyDto(
			family.familyId,
			family.name,
			members,
			vehicles
		);
	}
}
