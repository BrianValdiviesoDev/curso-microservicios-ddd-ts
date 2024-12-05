import logger from '../../framework/logger';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type Query<TResult> = object

export interface QueryHandler<T extends Query<TResult>, TResult> {
    execute(query: T): Promise<TResult>;
}

export class QueryBus {
	private handlers = new Map<string, QueryHandler<Query<unknown>, unknown>>();

	register<T extends Query<TResult>, TResult>(
		queryType: string,
		handler: QueryHandler<T, TResult>
	): void {
		logger.info(`[QueryBus] - register ${queryType}`);
		this.handlers.set(queryType, handler as QueryHandler<Query<unknown>, unknown>);
	}

	async execute<T extends Query<TResult>, TResult>(query: T): Promise<TResult> {
		logger.info(`[QueryBus] - execute ${query.constructor.name}`);
		const handler = this.handlers.get(query.constructor.name);
		if (!handler) {
			throw new Error(`No handler registered for query: ${query.constructor.name}`);
		}
		return (await handler.execute(query)) as TResult;
	}

	printQueries(){
		const keys = this.handlers.keys();
		for (const key of keys) {
			logger.info(`[QueryBus] - Print Handler: ${key}`);
		}
	}
}
