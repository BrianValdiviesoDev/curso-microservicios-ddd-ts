import { EventPort } from '../domain/event.port';
import { Event } from '../domain/event.entity';
import logger from '../framework/logger';

export class EventUseCase {
	constructor(private eventPort: EventPort) {}

	async publishEvent(event: Event): Promise<void> {
		await this.eventPort.send(event);
	}

	async processIncomingEvents(queue: string, name: string): Promise<void> {
		await this.eventPort.consume(queue, name, (event: Event) => {
			logger.info(`Event received: ${event.content}`);
		});
	}
}