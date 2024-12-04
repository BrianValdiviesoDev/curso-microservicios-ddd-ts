import { FamilyMapper } from '../application/family.mapper';
import { Family } from '../domain/family.entity';
import { IFamily } from '../domain/family.interface';
import { FamilyDbPort } from '../domain/familyDb.port';
import { NotFoundError } from '../errors/errorfactory';
import FamilyModel from './family.schema';


export class FamilyDbAdapter implements FamilyDbPort {
	async findById(familyId: string): Promise<Family> {
		const result = await FamilyModel.findOne({ familyId });
		if (!result) {
			throw new NotFoundError('Family not found');
		}
		return FamilyMapper.fromInfra(result);
	}
	async create(family: IFamily): Promise<Family> {
		const result = await FamilyModel.create(family);
		return FamilyMapper.fromInfra(result);
	}
}
