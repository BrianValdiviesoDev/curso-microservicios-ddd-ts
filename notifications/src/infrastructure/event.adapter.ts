import { EventPort } from '../domain/event.port';
import { Event } from '../domain/event.entity';
import amqplib, { Channel, Connection } from 'amqplib';
import logger from '../framework/logger';

export class EventRabbitAdapter implements EventPort{
	private rabbitmqUrl: string;
	private connection!: Connection;
	private channel!: Channel;
	private exchange: string;
    
	constructor(exchange: string) {
		if (!process.env.RABBITMQ_URL) {
			logger.error('RABBITMQ_URL is not set as environment variable');
			throw new Error('RABBITMQ_URL is not set as environment variable');
		}
		this.rabbitmqUrl = process.env.RABBITMQ_URL;
		this.exchange = exchange;
	}
    
	async connect(): Promise<void> {
		try {
			this.connection = await amqplib.connect(this.rabbitmqUrl);
			this.channel = await this.connection.createChannel();
			await this.channel.assertExchange(this.exchange, 'topic', { durable: true });
			logger.info('RabbitMQ connected!');
		} catch (error) {
			logger.error('Error connecting to RabbitMQ:', error);
			throw error;
		}
	}
    
	async send(event: Event): Promise<void> {
		if (!this.channel) {
			logger.error('RabbitMQ connection is not established. Call connect() first.');
			throw new Error('RabbitMQ connection is not established. Call connect() first.');
		}
      
		try {
			const messageBuffer = Buffer.from(JSON.stringify(event));
			this.channel.publish(this.exchange, event.name, messageBuffer);
			logger.info(`Message sent to exchange '${this.exchange}' with routingKey '${event.name}':`, JSON.stringify(event));
		} catch (error) {
			logger.error('Error sending message:', error);
			throw error;
		}
	}

	async consume(queue: string, routingKey: string, onMessage: (event: Event) => void): Promise<void> {
		if (!this.channel) {
			logger.error('RabbitMQ connection is not established. Call connect() first.');
		  	throw new Error('RabbitMQ connection is not established. Call connect() first.');
		}
		await this.channel.assertQueue(queue, { durable: true });
		await this.channel.bindQueue(queue, this.exchange, routingKey);
	
		this.channel.consume(queue, (msg) => {
		  	if (msg) {
				try {
					const json = JSON.parse(msg.content.toString());
					const event = new Event(json.name, JSON.parse(json.content));
					onMessage(event);
					this.channel.ack(msg);
				} catch (error) {
					logger.error('Error processing message:', error);
					this.channel.nack(msg, false, false);
				}
		  	}
		});
		logger.info(`Consumer setup for queue '${queue}' with routingKey '${routingKey}'`);
	}
    
}