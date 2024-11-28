import request from 'supertest';
import { app } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import UserModel from './user.schema';

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

describe('POST /', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('creates a new user', async () => {
		const res = await request(app).post('/').send({
			
			name: 'testuser',
			email: 'testuser@example.com',
			birth_date: new Date()  
						
		});
		expect(res.statusCode).toEqual(201);
	});
	it('fails creating a new user if some fields are empty', async () => {
		const emptyName = await request(app).post('/').send({
			name: '',
			email: 'testuser@example.com',
			birth_date: new Date()
		});
		expect(emptyName.statusCode).toEqual(400);
	});
});

describe('PUT /:id', () => {
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
			.put(`/${existing._id}`)
			.send({user});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe(user.name);
	});

});

describe('DELETE /:id', () => {
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
			.delete(`/${user._id}`);

		expect(res.statusCode).toEqual(200);
	});

	it('fail deleting a user if not exists', async () => {
		const res = await request(app)
			.delete(`/${new Types.ObjectId()}`);

		expect(res.statusCode).toEqual(404);
	});
});

describe('GET /', () => {
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
			.get('/');
		expect(res.statusCode).toEqual(200);

		const list = await UserModel.find({});
		expect(res.body.length).toBe(list.length);
	});
});

describe('GET /:id', () => {
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
			.get(`/${user._id}`);
        
		expect(res.statusCode).toEqual(200);
	});
	it('fails returning a user if not exists', async () => {
		const res = await request(app)
			.get(`/${new Types.ObjectId()}`);
		expect(res.statusCode).toEqual(404);
	});
});