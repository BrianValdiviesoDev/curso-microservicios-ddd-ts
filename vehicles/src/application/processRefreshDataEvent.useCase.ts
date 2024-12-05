import { Event } from '../domain/event.entity';
import { EventPort } from '../domain/event.port';
import logger from '../framework/logger';


export class ProcessRefreshDataEventUseCase {
	constructor(private eventPort: EventPort) {}
	async processRefresData(queue: string, name: string): Promise<void> {
		await this.eventPort.consume(queue, name, (event: Event) => {
			logger.info(`Actualizando información en la DGT para ${event.content.name}`);
		});
	}
}