import { IUser } from './user.interface';

export interface UsersPort {
    getById(userId: string): Promise<IUser>;
}