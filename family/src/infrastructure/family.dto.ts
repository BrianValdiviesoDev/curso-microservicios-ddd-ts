import { FamilyDto } from '../application/family.dto';

export class FamilyHttpResponseDto {
	constructor(
        public statusCode: number,
        public data?: FamilyDto | FamilyDto[],
	) {}
}
