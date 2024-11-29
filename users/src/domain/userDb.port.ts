import { User } from './user.entity';

export interface UserDbPort {
    create(user: User): Promise<User>;
    findById(userId: string): Promise<User | null>;
    listAll(): Promise<User[]>
    deleteById(userId: string): Promise<boolean>;
    updateById(userId: string, user: Partial<User>): Promise<User | null>;
}