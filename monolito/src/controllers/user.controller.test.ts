import request from 'supertest';
import { app } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import UserModel from '../entitites/user.schema';

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
		await UserModel.deleteMany({});
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
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('updates my user', async () => {
		const existing = await UserModel.create({
			name: 'testuser',
			email: 'test@test.com',
			birth_date: new Date()
		});
		const user = {
			name: 'my new name',
		};
		const res = await request(app)
			.put(`/users/${existing._id}`)
			.send({user});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe(user.name);
	});

});

describe('DELETE /users/:id', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('deletes a user', async () => {
		const user = await UserModel.create({
			name: 'testuser',
			email: 'test@test.com',
			birth_date: new Date()
		});
		const res = await request(app)
			.delete(`/users/${user._id}`);

		expect(res.statusCode).toEqual(200);
	});

	it('fail deleting a user if not exists', async () => {
		const res = await request(app)
			.delete(`/users/${new Types.ObjectId()}`);

		expect(res.statusCode).toEqual(404);
	});
});

describe('GET /users/', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('returns a complete list of users', async () => {
		await UserModel.insertMany([
			{
				name: 'testuser',
				email: 'test@test.com',
				birth_date: new Date()
			},
			{
				name: 'testuser2',
				email: 'test2@test.com',
				birth_date: new Date()
			},
			{
				name: 'testuser3',
				email: 'test3@test.com',
				birth_date: new Date()
			}
		]);
		const res = await request(app)
			.get('/users/');
		expect(res.statusCode).toEqual(200);

		const list = await UserModel.find({});
		expect(res.body.length).toBe(list.length);
	});
});

describe('GET /users/:id', () => {
	afterAll(async () => {
		await UserModel.deleteMany({});
	});

	it('returns a user', async () => {
		const user = await UserModel.create({
			name: 'testuser',
			email: 'test@test.com',
			birth_date: new Date()
		});
		const res = await request(app)
			.get(`/users/${user._id}`);
        
		expect(res.statusCode).toEqual(200);
	});
	it('fails returning a user if not exists', async () => {
		const res = await request(app)
			.get(`/users/${new Types.ObjectId()}`);
		expect(res.statusCode).toEqual(404);
	});
});