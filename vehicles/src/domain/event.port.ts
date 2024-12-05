import { Event } from './event.entity';
import { VehicleEvent } from './vehicleEvent.entity';
export interface EventPort {
    connect(): Promise<void>;
    consume(queue: string, name: string, onMessage: (event: Event) => void): Promise<void>;
    send(event: VehicleEvent): Promise<void>;
}