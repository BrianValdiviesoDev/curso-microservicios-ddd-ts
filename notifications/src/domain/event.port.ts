export interface EventPort {
    send(event: Event): Promise<void>;
}