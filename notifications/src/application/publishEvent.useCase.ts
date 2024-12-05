import { EventPort } from '../domain/event.port';
import { Event } from '../domain/event.entity';

export class PublishEventUseCase {
	constructor(private eventPort: EventPort) {}

	async execute(event: Event): Promise<void> {
		await this.eventPort.send(event);
	}
}