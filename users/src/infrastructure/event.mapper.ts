import { UserEvent } from '../domain/event.entity';
export class UserEventMapper {
	static toJson(event: UserEvent):Record<string,string> {
		return {
			name:event.eventName,
			content: JSON.stringify({
				name: event.user.name,
				email: event.user.email,
			})
		};
	}
}
