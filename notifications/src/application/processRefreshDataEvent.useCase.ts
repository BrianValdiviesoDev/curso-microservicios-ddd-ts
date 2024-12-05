import { EventPort } from '../domain/event.port';
import { Event } from '../domain/event.entity';
import logger from '../framework/logger';
import { EventMapper } from './event.mapper';

export class ProcessRefreshDataEventUseCase {
	constructor(private eventPort: EventPort) { }
	
	async execute(queue: string, name: string): Promise<void> {
		await this.eventPort.consume(queue, name, (event: Event) => {
			const userEvent = EventMapper.toUserEvent(event);
			logger.info(`${userEvent?.user.name} estamos actualizando tu información`);
		});
	}
}