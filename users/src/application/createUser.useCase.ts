import { UserDbPort } from '../domain/userDb.port';
import { EventPort } from '../domain/userEvent.port';
import { CreateUserDTO } from './createUser.dto';
import { SendEventUseCase } from './sendEvent.useCase';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';
import { UserEvent } from '../domain/event.entity';

export class CreateUserUseCase {
	constructor(
		private readonly userDb: UserDbPort,
		private readonly eventPort: EventPort,
	) { }
    
	public execute = async (userDto: CreateUserDTO): Promise<UserDto> => {
		const user = UserMapper.toDomain(userDto);
		const result = await this.userDb.create(user);

		const eventUseCase = new SendEventUseCase(this.eventPort);
		const event = new UserEvent('user.created', result);
		eventUseCase.publishEvent(event);
		return UserMapper.toDto(result);
	};
}