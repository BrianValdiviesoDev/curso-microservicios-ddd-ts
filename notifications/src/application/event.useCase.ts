import { EventPort } from '../domain/event.port';
import { Event } from '../domain/event.entity';
import logger from '../framework/logger';
import { EventMapper } from './event.mapper';

export class EventUseCase {
	constructor(private eventPort: EventPort) {}

	async publishEvent(event: Event): Promise<void> {
		await this.eventPort.send(event);
	}

	async processUserCreated(queue: string, name: string): Promise<void> {
		//Conectar con un puerto de email para enviar
		//Conectar con un puerto de sms para enviar
		await this.eventPort.consume(queue, name, (event: Event) => {
			const userEvent = EventMapper.toUserEvent(event);
			logger.info(`${userEvent?.user.name} bienvenido a la aplicación Family Planner`);
		});
	}
}