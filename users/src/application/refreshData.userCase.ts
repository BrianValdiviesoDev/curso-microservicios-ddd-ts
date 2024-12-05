import { UserDbPort } from '../domain/userDb.port';
import { EventPort } from '../domain/userEvent.port';
import { SendEventUseCase } from './sendEvent.useCase';
import { UserEvent } from '../domain/event.entity';
import logger from '../framework/logger';

export class RefreshDataUserUseCase {
	constructor(
		private readonly userDb: UserDbPort,
		private readonly eventPort: EventPort,
	) { }
    
	public execute = async (): Promise<void> => {
		if (!process.env.USER_REFRESH_DATA_ROUTING_KEY) {
			logger.error('USER_REFRESH_DATA_ROUTING_KEY is not set as environment variable');
			throw new Error('USER_REFRESH_DATA_ROUTING_KEY is not set as environment variable');
		}
		const users = await this.userDb.listAll();
		const eventUseCase = new SendEventUseCase(this.eventPort);
		await Promise.all(users.map((user) => {
			const event = new UserEvent(process.env.USER_REFRESH_DATA_ROUTING_KEY!, user);
			return eventUseCase.publishEvent(event);
		}));
	};
}