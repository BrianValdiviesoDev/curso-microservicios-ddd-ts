import { IVehicle } from './vehicle.interface';

export interface VehiclesPort {
    getById(vehicleId: string): Promise<IVehicle>;
}