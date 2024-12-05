import { UserDbPort } from '../domain/userDb.port';
import { EventPort } from '../domain/userEvent.port';
import { CreateUserDTO } from './createUser.dto';
import { SendEventUseCase } from './sendEvent.useCase';
import { UserDto } from './user.dto';
import { UserMapper } from './user.mapper';
import { UserEvent } from '../domain/event.entity';
import logger from '../framework/logger';

export class CreateUserUseCase {
	constructor(
		private readonly userDb: UserDbPort,
		private readonly eventPort: EventPort,
	) { }
    
	public execute = async (userDto: CreateUserDTO): Promise<UserDto> => {
		if (!process.env.USER_CREATED_ROUTING_KEY) {
			logger.error('USER_CREATED_ROUTING_KEY is not set as environment variable');
			throw new Error('USER_REFRESH_DATA_ROUTING_KEY is not set as environment variable');
		}
		const user = UserMapper.toDomain(userDto);
		const result = await this.userDb.create(user);

		const eventUseCase = new SendEventUseCase(this.eventPort);
		const event = new UserEvent(process.env.USER_CREATED_ROUTING_KEY, result);
		eventUseCase.publishEvent(event);
		return UserMapper.toDto(result);
	};
}