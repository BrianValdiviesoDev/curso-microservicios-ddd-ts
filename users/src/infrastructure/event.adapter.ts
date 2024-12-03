import { UserEvent } from '../domain/event.entity';
import amqplib, { Channel, Connection } from 'amqplib';
import logger from '../framework/logger';
import { EventPort } from '../domain/userEvent.port';
import { UserEventMapper } from './event.mapper';

export class EventRabbitAdapter implements EventPort{
	private rabbitmqUrl: string;
	private connection!: Connection;
	private channel!: Channel;
	private exchange: string;
    
	constructor() {
		if (!process.env.RABBITMQ_URL) {
			logger.error('RABBITMQ_URL is not set as environment variable');
			throw new Error('RABBITMQ_URL is not set as environment variable');
		}
		if (!process.env.EXCHANGE) {
			logger.error('EXCHANGE is not set as environment variable');
			throw new Error('EXCHANGE is not set as environment variable');
		}
		this.rabbitmqUrl = process.env.RABBITMQ_URL;
		this.exchange = process.env.EXCHANGE;
	}
    
	async connect(): Promise<void> {
		try {
			this.connection = await amqplib.connect(this.rabbitmqUrl);
			this.channel = await this.connection.createChannel();
			await this.channel.assertExchange(this.exchange, 'direct', { durable: true });
			logger.info('RabbitMQ connected!');
		} catch (error) {
			logger.error('Error connecting to RabbitMQ:', error);
			throw error;
		}
	}
    
	async send(event: UserEvent): Promise<void> {
		if (!this.channel) {
			logger.error('RabbitMQ connection is not established. Call connect() first.');
			throw new Error('RabbitMQ connection is not established. Call connect() first.');
		}
      
		try {
			const mappedEvent = UserEventMapper.toJson(event);
			const messageBuffer = Buffer.from(JSON.stringify(mappedEvent));
			this.channel.publish(this.exchange, event.eventName, messageBuffer);
			logger.info(`Message sent to exchange '${this.exchange}' with routingKey '${event.eventName}':`, JSON.stringify(event));
		} catch (error) {
			logger.error('Error sending message:', error);
			throw error;
		}
	}    
}