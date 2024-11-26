import 'dotenv/config';

describe('MICRO-USERS /monit/health', () => {
	it('checks connection with micro-users', async () => {
		const userMicroUrl = process.env.USERS_MICRO;
		const uri = `${userMicroUrl}/monit/health`;
		const response = await fetch(uri, {
			method:'GET'
		});
		expect(response.status).toEqual(200);
	});

});