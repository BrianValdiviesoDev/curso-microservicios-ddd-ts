import { Rol, User } from '../domain/user.entity';
import { CreateUserDTO } from './createUser.dto';
import { UserDto } from './user.dto';

export class UserMapper {
	// Mapeo de entrada a dominio
	static toDomain(dto: CreateUserDTO): User {
		return new User(
			dto.name,
			dto.email,
			[Rol.USER],
			dto.birth_date,
			dto.car_license
		);
	}

	// Mapeo de salida a infra
	static toDto(user: User): UserDto {
		return new UserDto(
			user.name,
			user.email,
			user.rol,
			user.birth_date,
			user.car_license
		);
	}
}
