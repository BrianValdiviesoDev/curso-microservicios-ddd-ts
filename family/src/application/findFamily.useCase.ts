import { FamilyDbPort } from '../domain/familyDb.port';
import { FamilyDto } from './family.dto';
import { FamilyMapper } from './family.mapper';

export class FindFamilyUseCase {
	constructor(
		private readonly familyDb: FamilyDbPort,
	) { }
    
	public execute = async (familyId: string): Promise<FamilyDto> => {
		const result = await this.familyDb.findById(familyId);
		//fetch users
		//fetch vehicles
		return FamilyMapper.toDto(result);
	};
}