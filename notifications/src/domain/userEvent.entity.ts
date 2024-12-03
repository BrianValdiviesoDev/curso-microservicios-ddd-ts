import { User } from './user.entity';
import { IUserEvent } from './userEvent.interface';

export class UserEvent implements IUserEvent{
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