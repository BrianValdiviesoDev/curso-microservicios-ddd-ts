import { CreateFamilyDTO } from '../application/createFamily.dto';
import { CreateFamilyUseCase } from '../application/createFamily.useCase';
import { FamilyHttpResponseDto } from './family.dto';
import { FamilyDbAdapter } from './familyDb.adapter';

export const createFamily = async (family: CreateFamilyDTO): Promise<FamilyHttpResponseDto> => {
	const familyUseCase = new CreateFamilyUseCase(new FamilyDbAdapter());
	const created = await familyUseCase.execute(family);
	return new FamilyHttpResponseDto(201, created);
};