import { Event } from './event.entity';
export interface EventPort {
    connect(): Promise<void>;
    send(event: Event): Promise<void>;
    consume(queue: string, name: string, onMessage: (event: Event) => void): Promise<void>;
}