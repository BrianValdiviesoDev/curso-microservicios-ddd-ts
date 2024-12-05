import { Vehicle } from './vehicle.entity';
import { IVehicleEvent } from './vehicleEvent.interface';

export class VehicleEvent implements IVehicleEvent{
	public eventName: string;
	public vehicle: Vehicle;

	constructor(
		eventName: string,
		vehicle: Vehicle
	) {
		this.eventName = eventName;
		this.vehicle = vehicle;
	}
}