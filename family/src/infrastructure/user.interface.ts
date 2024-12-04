export interface UserApiResponse {
    userId: string;
    name: string;
    email: string;
    birth_date?: Date;
    car_license?: string;
    rol?:string[]
}