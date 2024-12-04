import { IInsurance } from './insurance.interface';

export enum VehicleType{
    CAR = 'CAR',
    MOTO = 'MOTO',
}

export interface IVehicle {
    vehicleId: string;
    licensePlate: string;
    brand: string;
    model: string;
    kilometers: number;
    insurances?: IInsurance[];
    itv?: string[];
    checkups?: string[];
}