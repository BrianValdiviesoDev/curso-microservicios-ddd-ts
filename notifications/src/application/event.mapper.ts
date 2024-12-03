import { UserEvent } from '../domain/userEvent.entity';
import { Event } from '../domain/event.entity';

export class EventMapper {
	static toUserEvent(event: Event): UserEvent {
		return new UserEvent(
			event.name,
			{
				userId: event.content.userId,
				name: event.content.name,
				email: event.content.email,
				phone_number: Number(event.content.phone_number),
				notifications_consent: Boolean(event.content.notifications_consent)
			}
		);
	}
}