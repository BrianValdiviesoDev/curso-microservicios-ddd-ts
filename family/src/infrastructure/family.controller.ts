import { CreateFamilyDTO } from '../application/createFamily.dto';
import { CreateFamilyUseCase } from '../application/createFamily.useCase';
import { FindFamilyUseCase } from '../application/findFamily.useCase';
import { FamilyHttpResponseDto } from './family.dto';
import { FamilyDbAdapter } from './familyDb.adapter';
import { UsersAdapter } from './user.adapter';
import { VehiclesAdapter } from './vehicles.adapter';

export const createFamily = async (family: CreateFamilyDTO): Promise<FamilyHttpResponseDto> => {
	const familyUseCase = new CreateFamilyUseCase(new FamilyDbAdapter());
	const created = await familyUseCase.execute(family);
	return new FamilyHttpResponseDto(201, created);
};

export const getFamily = async (familyId: string): Promise<FamilyHttpResponseDto> => {
	const familyUseCase = new FindFamilyUseCase(new FamilyDbAdapter(), new UsersAdapter(), new VehiclesAdapter());
	const response = await familyUseCase.execute(familyId);
	return new FamilyHttpResponseDto(200, response);
};