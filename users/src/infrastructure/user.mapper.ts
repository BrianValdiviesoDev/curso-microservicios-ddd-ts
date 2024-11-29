import { User } from '../domain/user.entity';
import { UserDocument } from './user.schema';

export class UserMapper {
	// Mapeo de mongo a dominio
	static toDomain(document: UserDocument): User {
		return new User(
			document.name,
			document.email,
			document.rol,
			document.userId,
			document.birth_date,
			document.car_license
		);
	}
}
