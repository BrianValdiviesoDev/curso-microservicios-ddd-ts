
import { IVehicle } from './vehicle.interface';


  
export class Vehicle implements IVehicle {
	public readonly vehicleId: string;
	public licensePlate: string;
	public insurances?: string[];
	public brand: string;
	public model: string;
	public kilometers: number;
	public itv?: string[] | undefined;
	public checkups?: string[] | undefined;
    
	constructor(
		licensePlate: string,
		brand: string,
		model: string,
		kilometers: number,
		insurances?: string[],
		itv?: string[] | undefined,
		checkups?: string[] | undefined
	) {
		this.licensePlate = licensePlate;
		this.insurances = insurances;
		this.brand = brand;
		this.model = model;
		this.kilometers = kilometers;
		this.itv = itv;
		this.checkups = checkups;
		this.vehicleId = this.generateVehicleId();
	}

    
	private generateVehicleId = ():string => {
		return this.licensePlate;
	};
}

