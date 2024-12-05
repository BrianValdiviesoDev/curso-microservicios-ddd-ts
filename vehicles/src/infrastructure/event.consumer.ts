import { ProcessRefreshDataEventUseCase } from '../application/processRefreshDataEvent.useCase';
import logger from '../framework/logger';
import { EventRabbitAdapter } from './event.adapter';

export const initializeRabbit = async () => {
	if (!process.env.EXCHANGE) {
		logger.error('EXCHANGE is not set as environment variable');
		throw new Error('EXCHANGE is not set as environment variable');
	}

	if (!process.env.USER_REFRESH_DATA_ROUTING_KEY) {
		logger.error('USER_REFRESH_DATA_ROUTING_KEY is not set as environment variable');
		throw new Error('USER_REFRESH_DATA_ROUTING_KEY is not set as environment variable');
	}
	const rabbitAdapter = new EventRabbitAdapter(process.env.EXCHANGE);
	const eventUseCase = new ProcessRefreshDataEventUseCase(rabbitAdapter);
	await rabbitAdapter.connect();

	// Configurar el consumidor
	await eventUseCase.processRefresData(`vehicles.${process.env.USER_REFRESH_DATA_ROUTING_KEY}`, process.env.USER_REFRESH_DATA_ROUTING_KEY);
};
