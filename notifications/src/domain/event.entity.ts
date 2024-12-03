import { IEvent } from './event.interface';

export class Event implements IEvent{
	public name: string;
	public content: Record<string, string>;

	constructor(
		name: string,
		content: Record<string, string>
	) {
		this.name = name;
		this.content = content;
	}
}