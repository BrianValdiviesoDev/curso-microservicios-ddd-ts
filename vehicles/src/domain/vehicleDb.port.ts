import { Vehicle } from './vehicle.entity';

export interface VehicleDbPort {
    create(vehicle: Vehicle): Promise<Vehicle>;
}