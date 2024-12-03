import { User } from './user.entity';
import { Rol } from './user.interface';

describe('userEntity', () => {
	it('returns a user', async () => {
		const user = new User(
			'test',
			'test@test.com',
			[Rol.USER]
		);
		expect(user).not.toBeNull();
	});
    
	it('throw email validation error', async () => {
		expect(()=> new User(
			'test',
			'test.com',
			[Rol.USER]
		)).toThrow();
	});
});