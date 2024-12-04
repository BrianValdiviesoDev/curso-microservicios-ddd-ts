import { Vehicle } from './vehicle.entity';

export interface VehicleDbPort {
    create(vehicle: Vehicle): Promise<Vehicle>;
    addInsurance(vehicleId: string, insuranceId: string): Promise<Vehicle>;
    findByLicensePlate(licensePlate:string):Promise<Vehicle>
}