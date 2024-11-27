import request from 'supertest';
import { app } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri);	
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe('POST /users/', () => {
	beforeAll(async () => {
		global.fetch = jest.fn().mockImplementation((url, options) => {
			if (!url.includes(process.env.USERS_MICRO)) {
				console.error('USERS_MICRO is not set as environment variable');
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('Not Found'),
			  });
			}
			// Validar campos obligatorios
			const body = JSON.parse(options?.body || '{}');
			if (!body.name || !body.email) {
			  return Promise.resolve({
					status: 400,
					text: jest.fn().mockResolvedValue('Email and name are required'),
			  });
			}
		  
			// Simular una respuesta exitosa si todo está bien
			return Promise.resolve({
			  status: 201,
			  json: jest.fn().mockResolvedValue({
					id: new Types.ObjectId(),
					name: body.name,
					email: body.email,
			  }),
			});
		});
	});
	
	afterAll(async () => {
		await jest.resetAllMocks();
		await jest.restoreAllMocks();
	});

	afterEach(async () => {
		await jest.clearAllMocks();
	});

	it('creates a new user', async () => {
		const res = await request(app).post('/users/').send({
			
			name: 'testuser',
			email: 'testuser@example.com',
			birth_date: new Date()  
						
		});
		expect(res.statusCode).toEqual(201);
	});
	it('fails creating a new user if some fields are empty', async () => {
		const emptyName = await request(app).post('/users/').send({
			name: '',
			email: 'testuser@example.com',
			birth_date: new Date()
		});
		expect(emptyName.statusCode).toEqual(400);
	});
});

describe('PUT /users/:id', () => {
	beforeAll(async () => {
		global.fetch = jest.fn().mockImplementation((url, options) => {
			if (!url.includes(process.env.USERS_MICRO)) {
				console.error('USERS_MICRO is not set as environment variable');
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('Not Found'),
			  });
			}
			// Validar campos obligatorios
			const body = JSON.parse(options?.body || '{}');
			if (url.includes('/404')) {
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('User not found'),
			  });
			}
		  
			// Simular una respuesta exitosa si todo está bien
			return Promise.resolve({
			  status: 200,
			  json: jest.fn().mockResolvedValue({
					id: new Types.ObjectId(),
					name: body.user.name,
					email: body.user.email,
			  }),
			});
		});
	});
	
	afterAll(async () => {
		await jest.resetAllMocks();
		await jest.restoreAllMocks();
	});

	afterEach(async () => {
		await jest.clearAllMocks();
	});

	it('updates my user', async () => {
		const user = {
			name: 'my new name',
		};
		const res = await request(app)
			.put('/users/test')
			.send({user});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe(user.name);
	});

	it('fail updating if user not exists', async () => {
		const user = {
			name: 'my new name',
		};
		const res = await request(app)
			.put('/users/404')
			.send({user});
		expect(res.statusCode).toEqual(404);
	});

});

describe('DELETE /users/:id', () => {
	beforeAll(async () => {
		global.fetch = jest.fn().mockImplementation((url, options) => {
			if (!url.includes(process.env.USERS_MICRO)) {
				console.error('USERS_MICRO is not set as environment variable');
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('Not Found'),
			  });
			}
			const body = JSON.parse(options?.body || '{}');
			if (url.includes('/404')) {
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('User not found'),
			  });
			}
		  
			return Promise.resolve({
			  status: 200,
			  json: jest.fn().mockResolvedValue({
					id: new Types.ObjectId(),
					name: body.name,
					email: body.email,
			  }),
			});
		});
	});
	
	afterAll(async () => {
		await jest.resetAllMocks();
		await jest.restoreAllMocks();
	});

	afterEach(async () => {
		await jest.clearAllMocks();
	});

	it('deletes a user', async () => {
		const res = await request(app)
			.delete('/users/test');

		expect(res.statusCode).toEqual(200);
	});

	it('fail deleting a user if not exists', async () => {
		const res = await request(app)
			.delete('/users/404');

		expect(res.statusCode).toEqual(404);
	});
});

describe('GET /users/', () => {
	beforeAll(async () => {
		global.fetch = jest.fn().mockImplementation((url) => {
			if (!url.includes(process.env.USERS_MICRO)) {
				console.error('USERS_MICRO is not set as environment variable');
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('Not Found'),
			  });
			}
			return Promise.resolve({
			  status: 200,
			  json: jest.fn().mockResolvedValue({
					id: new Types.ObjectId(),
					name: 'test',
					email: 'test',
			  }),
			});
		});
	});
	
	afterAll(async () => {
		await jest.resetAllMocks();
		await jest.restoreAllMocks();
	});

	afterEach(async () => {
		await jest.clearAllMocks();
	});

	it('returns a complete list of users', async () => {

		const res = await request(app)
			.get('/users/');
		expect(res.statusCode).toEqual(200);
	});
});

describe('GET /users/:id', () => {
	beforeAll(async () => {
		global.fetch = jest.fn().mockImplementation((url, options) => {
			if (!url.includes(process.env.USERS_MICRO)) {
				console.error('USERS_MICRO is not set as environment variable');
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('Not Found'),
			  });
			}
			const body = JSON.parse(options?.body || '{}');
			if (url.includes('/404')) {
			  return Promise.resolve({
					status: 404,
					text: jest.fn().mockResolvedValue('User not found'),
			  });
			}
		  
			return Promise.resolve({
			  status: 200,
			  json: jest.fn().mockResolvedValue({
					id: new Types.ObjectId(),
					name: body.name,
					email: body.email,
			  }),
			});
		});
	});
	
	afterAll(async () => {
		await jest.resetAllMocks();
		await jest.restoreAllMocks();
	});

	afterEach(async () => {
		await jest.clearAllMocks();
	});

	it('returns a user', async () => {
		const res = await request(app)
			.get('/users/test');
        
		expect(res.statusCode).toEqual(200);
	});
	it('fails returning a user if not exists', async () => {
		const res = await request(app)
			.get('/users/404');
		expect(res.statusCode).toEqual(404);
	});
});