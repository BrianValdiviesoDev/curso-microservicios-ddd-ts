import { User } from './user.entity';

export interface IUserEvent{
    eventName: string;
    user: User;
}