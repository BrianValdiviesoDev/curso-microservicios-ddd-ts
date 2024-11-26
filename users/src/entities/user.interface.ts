import { Document, Types } from 'mongoose';

export enum Rol{
    USER = 'USER',
    ADMIN = 'ADMIN',
    SUPERADMIN = 'SUPERADMIN',
    FOUNDER = 'FOUNDER'
}

export enum LicenseType{
    B = 'B',
    A2 = 'A2',
    AM = 'AM'
}

export interface User{
    name: string;
    email: string;
    birth_date: Date;
    rol: Rol[];
    car_license: LicenseType;
}
  
export interface UserDocument extends User, Document {
    _id: Types.ObjectId;
}