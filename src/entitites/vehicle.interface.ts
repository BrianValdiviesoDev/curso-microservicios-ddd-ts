import { Document, Types } from 'mongoose';

export enum VehicleType {
    CAR = 'CAR',
    MOTORBIKE = 'MOTORBIKE',
    BIKE = 'BIKE'
}
export interface Vehicle{
    name: string;
    type?: VehicleType;
    license_plate?: string;
    frame_number?: string;
    registration_date?: Date
}
  
export interface VehicleDocument extends Vehicle, Document {
    _id: Types.ObjectId;
}