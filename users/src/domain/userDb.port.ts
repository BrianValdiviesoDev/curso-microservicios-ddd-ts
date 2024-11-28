import { User } from './user.entity';

export interface UserDbPort {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
}