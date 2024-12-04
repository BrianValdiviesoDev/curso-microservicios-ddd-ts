import { IFamily } from './family.interface';
import { v6 as uuidv6 } from 'uuid';

export class Family implements IFamily{
	public name: string;
	public members: string[];
	public vehicles: string[];
	public familyId: string;

	constructor(
		name: string,
		members: string[],
		vehicles: string[],
		id?: string,
	) {
		this.name = name;
		this.members = members;
		this.vehicles = vehicles;
		this.familyId = id || this.generateId();
	}
    
	generateId(){
		return uuidv6();
	}
}