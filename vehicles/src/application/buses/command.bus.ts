export type Command = object

export interface CommandHandler<T extends Command> {
    execute(command: T): Promise<void>;
}

export class CommandBus {
	private handlers = new Map<string, CommandHandler<Command>>();

	register<T extends Command>(commandType: string, handler: CommandHandler<T>): void {
		this.handlers.set(commandType, handler as CommandHandler<Command>);
	}

	async execute<T extends Command>(command: T): Promise<void> {
		const handler = this.handlers.get(command.constructor.name);
		if (!handler) {
			throw new Error(`No handler registered for command: ${command.constructor.name}`);
		}
		await handler.execute(command);
	}
}
