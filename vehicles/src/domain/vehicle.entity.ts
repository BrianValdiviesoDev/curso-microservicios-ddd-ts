
import { Insurance } from './insurance.entity';
import { IVehicle } from './vehicle.interface';


  
export class Vehicle implements IVehicle {
	public readonly vehicleId: string;
	public licensePlate: string;
	public insurances?: Insurance[];
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
		insurances?: Insurance[],
		itv?: string[] | undefined,
		checkups?: string[] | undefined,
		id?: string
	) {
		this.licensePlate = licensePlate;
		this.insurances = insurances;
		this.brand = brand;
		this.model = model;
		this.kilometers = kilometers;
		this.itv = itv;
		this.checkups = checkups;
		this.vehicleId = id || this.generateVehicleId();
	}

    
	private generateVehicleId = ():string => {
		return this.licensePlate;
	};
}

