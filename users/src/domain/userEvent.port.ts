import { UserEvent } from './event.entity';
export interface EventPort {
    connect(): Promise<void>;
    send(event: UserEvent): Promise<void>;
}