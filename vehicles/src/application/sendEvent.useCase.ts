import { EventPort } from '../domain/event.port';
import { VehicleEvent } from '../domain/vehicleEvent.entity';

export class SendEventUseCase {
	constructor(private eventPort: EventPort) {}

	async publishEvent(event: VehicleEvent): Promise<void> {
		await this.eventPort.send(event);
	}
}