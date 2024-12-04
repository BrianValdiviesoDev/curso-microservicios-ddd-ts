import { IUser } from '../domain/user.interface';
import { IVehicle } from '../domain/vehicle.interface';

export class FamilyDto {
	constructor(
    public familyId:string,
    public name: string,
    public members?: IUser[] | string[],
    public vehicles?: IVehicle[] | string[]
	) {}
}
