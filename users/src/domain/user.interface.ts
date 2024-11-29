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

export interface IUser {
    userId: string;
    name: string;
    email: string;
    birth_date?: Date;
    rol: Rol[];
    car_license?: LicenseType;
  }