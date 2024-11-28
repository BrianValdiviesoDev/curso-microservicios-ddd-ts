import { User } from './user.entity';

export interface UserDbPort {
    create(user: User): Promise<User>;
}