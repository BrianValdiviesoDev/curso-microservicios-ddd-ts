import { FamilyDto } from '../application/family.dto';
import { FamilyWithApiCompositionDto } from '../application/familyWithApiComposition.dto';

export class FamilyHttpResponseDto {
	constructor(
        public statusCode: number,
        public data?: FamilyDto | FamilyDto[] | FamilyWithApiCompositionDto | FamilyWithApiCompositionDto[],
	) {}
}
