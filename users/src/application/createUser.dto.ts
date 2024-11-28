import { LicenseType } from '../domain/user.entity';

export class CreateUserDTO {
	constructor(
    public name: string,
    public email: string,
    public birth_date?: Date,
    public car_license?: LicenseType
	) {}
}
