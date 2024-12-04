import { IUser } from '../domain/user.interface';
import { IVehicle } from '../domain/vehicle.interface';

export class FamilyWithApiCompositionDto {
	constructor(
    public familyId:string,
    public name: string,
    public members?: IUser[],
    public vehicles?: IVehicle[]
	) {}
}