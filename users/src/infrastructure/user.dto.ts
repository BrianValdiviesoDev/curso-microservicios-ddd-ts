import { UserDto } from '../application/user.dto';

export class UserHttpResponseDto {
	constructor(
        public statusCode: number,
        public data?: UserDto | UserDto[],
	) {}
}
