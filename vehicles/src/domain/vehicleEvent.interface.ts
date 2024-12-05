import { Vehicle } from './vehicle.entity';

export interface IVehicleEvent{
    eventName: string;
    vehicle: Vehicle;
}