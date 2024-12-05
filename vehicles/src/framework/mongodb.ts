import mongoose, { Connection } from 'mongoose';
import logger from './logger';
import { Logger } from 'winston';

export class MongoService {
	private commandUri: string;
	private queryUri:string;
	private log:Logger = logger;
	private queryConnection: Connection | null = null;
	private commandConnection: Connection | null = null;
	
	constructor() {
		if (!process.env.DB_COMMAND_URI) {
			throw new Error('DB_COMMAND_URI is not set as environment variable');
		}
		this.commandUri = process.env.DB_COMMAND_URI;

		if (!process.env.DB_QUERY_URI) {
			throw new Error('DB_QUERY_URI is not set as environment variable');
		}
		this.queryUri = process.env.DB_QUERY_URI;
	}

	async connectToCommandDb() {
		mongoose.set('debug', true);
		if (!this.commandConnection) {
			try {
				const connection = await mongoose.createConnection(this.commandUri);
				this.commandConnection = connection;
				this.log.info('Connected to Command Database!');
			} catch (err) {
				this.log.error(`Error connecting to Command Database: ${err}`);
				throw err;
			}
		}
		return this.commandConnection;
	}

	async connectToQueryDb() {
		mongoose.set('debug', true);
		if (!this.queryConnection) {
			try {
				const connection = await mongoose.createConnection(this.queryUri);
				this.queryConnection = connection;
				this.log.info('Connected to Query Database!');
			} catch (err) {
				this.log.error(`Error connecting to Query Database: ${err}`);
				throw err;
			}
		}
		return this.queryConnection;
	}

	close = () => {
		mongoose.disconnect();
		this.log.info('MongoDB disconnected!');
	};
}