import { FamilyDbPort } from '../domain/familyDb.port';
import { UsersPort } from '../domain/users.port';
import { VehiclesPort } from '../domain/vehicles.port';
import logger from '../framework/logger';
import { FamilyDto } from './family.dto';
import { FamilyMapper } from './family.mapper';
import { FamilyWithApiCompositionDto } from './familyWithApiComposition.dto';

export class FindFamilyUseCase {
	constructor(
		private readonly familyDb: FamilyDbPort,
		private readonly usersPort: UsersPort,
		private readonly vehiclesPort: VehiclesPort,
	) { }
    
	public execute = async (familyId: string): Promise<FamilyDto | FamilyWithApiCompositionDto> => {
		const family = await this.familyDb.findById(familyId);
		try {
			const users = await Promise.all(family.members.map((memberId) => {
				return this.usersPort.getById(memberId);
			}));

			const vehicles = await Promise.all(family.vehicles.map((vehicleId) => {
				return this.vehiclesPort.getById(vehicleId);
			}));
			
			return FamilyMapper.fromApiComposition(family, users, vehicles);
		} catch (e) {
			logger.error(`Error composing Family: ${e}`);
		}
		return FamilyMapper.toDto(family);
	};
}