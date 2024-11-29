import { UserDbPort } from '../domain/userDb.port';
import { NotFoundError } from '../errors/errorfactory';

export class DeleteUserUseCase {
	constructor(
        private readonly userDb: UserDbPort
	) { }
    
	public execute = async (userId: string): Promise<void> => {
		const result = await this.userDb.deleteById(userId);
		if (!result) {
			throw new NotFoundError('User not found');
		}
	};
}