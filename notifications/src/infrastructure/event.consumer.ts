import { EventUseCase } from '../application/event.useCase';
import logger from '../framework/logger';
import { EventRabbitAdapter } from './event.adapter';

export const initializeRabbit = async () => {
	if (!process.env.EXCHANGE) {
		logger.error('EXCHANGE is not set as environment variable');
		throw new Error('EXCHANGE is not set as environment variable');
	}
	const rabbitAdapter = new EventRabbitAdapter(process.env.EXCHANGE);
	const eventUseCase = new EventUseCase(rabbitAdapter);
	await rabbitAdapter.connect();

	// Configurar el consumidor
	await eventUseCase.processUserCreated('user.queue', 'user.created');
};
