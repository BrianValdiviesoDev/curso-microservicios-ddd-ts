import { UserEvent } from '../domain/event.entity';
import { EventPort } from '../domain/userEvent.port';

export class SendEventUseCase {
	constructor(private eventPort: EventPort) {}

	async publishEvent(event: UserEvent): Promise<void> {
		await this.eventPort.send(event);
	}
}