import { FamilyDbPort } from '../domain/familyDb.port';
import { CreateFamilyDTO } from './createFamily.dto';
import { FamilyDto } from './family.dto';
import { FamilyMapper } from './family.mapper';

export class CreateFamilyUseCase {
	constructor(
		private readonly familyDb: FamilyDbPort,
	) { }
    
	public execute = async (familyDto: CreateFamilyDTO): Promise<FamilyDto> => {
		const family = FamilyMapper.fromCreate(familyDto);
		const result = await this.familyDb.create(family);
		return FamilyMapper.toDto(result);
	};
}