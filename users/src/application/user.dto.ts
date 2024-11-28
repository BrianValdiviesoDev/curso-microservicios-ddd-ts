import { LicenseType, Rol } from '../domain/user.entity';

export class UserDto {
	constructor(
    public name: string,
    public email: string,
    public rol: Rol[],
    public birth_date?: Date,
    public car_license?: LicenseType
	) {}
}
