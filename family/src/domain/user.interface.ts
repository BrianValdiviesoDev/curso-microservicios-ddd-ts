export interface IUser {
    userId: string;
    name: string;
    email: string;
    birth_date?: Date;
    rol: string[];
    car_license?: string;
  }