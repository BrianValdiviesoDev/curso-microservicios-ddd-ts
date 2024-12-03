import { IEvent } from './event.interface';
import { User } from './user.entity';

export class UserEvent implements IEvent{
	public eventName: string;
	public user: User;

	constructor(
		eventName: string,
		user: User
	) {
		this.eventName = eventName;
		this.user = user;
	}
}