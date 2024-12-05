import logger from '../../framework/logger';

export type Command = object

export interface CommandHandler<T extends Command> {
    execute(command: T): Promise<void>;
}

export class CommandBus {
	private handlers = new Map<string, CommandHandler<Command>>();

	printCommands(){
		const keys = this.handlers.keys();
		for (const key of keys) {
			logger.info(`[CommandBus] - Print Handler: ${key}`);
		}
	}

	register<T extends Command>(commandType: string, handler: CommandHandler<T>): void {
		logger.info(`[CommandBus] - register ${commandType}`);
		this.handlers.set(commandType, handler as CommandHandler<Command>);
	}

	async execute<T extends Command>(command: T): Promise<void> {
		logger.info(`[CommandBus] - execute ${command.constructor.name}`);
		const handler = this.handlers.get(command.constructor.name);
		if (!handler) {
			throw new Error(`No handler registered for command: ${command.constructor.name}`);
		}
		await handler.execute(command);
	}
}
