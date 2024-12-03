import { User } from './user.entity';

export interface IEvent{
    eventName: string;
    user: User;
}