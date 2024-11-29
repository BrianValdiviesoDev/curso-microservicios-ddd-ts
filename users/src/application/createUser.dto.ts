import { LicenseType } from '../domain/user.interface';

export class CreateUserDTO {
	constructor(
    public name: string,
    public email: string,
    public birth_date?: Date,
    public car_license?: LicenseType
	) {}
}
