import mongoose from 'mongoose';
import logger from './logger';
import { Logger } from 'winston';

export class MongoService {
	private uri: string;
	private log:Logger = logger;

	constructor() {
		if (!process.env.DB_URI) {
			throw new Error('DB_URI is not set as environment variable');
		}
		this.uri = process.env.DB_URI;
	}

	connect() {
		mongoose.set('debug', process.env.NODE_ENV=='dev');
		mongoose
			.connect(this.uri)
			.then(
				() => {
					this.log.info('MongoDB connected!');
				},
				(err) => {
					this.log.error(`Error connecting with mongo: ${err}`);
				}
			)
			.catch((err) => {
				this.log.error(`Error connecting with mongo: ${err}`);
			});

		mongoose.connection.on('error', (error) => {
			mongoose.disconnect();
			this.log.error(`Error in MongoDb connection: ${error}`);
		});
	}

	close = () => {
		mongoose.disconnect();
		this.log.info('MongoDB disconnected!');
	};
}