import { LicenseType, Rol } from '../domain/user.interface';

export class UserDto {
	constructor(
    public userId:string,
    public name: string,
    public rol: Rol[],
    public email: string,
    public birth_date?: Date,
    public car_license?: LicenseType
	) {}
}
