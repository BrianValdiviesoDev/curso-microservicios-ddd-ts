import request from 'supertest';
import { app } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import UserModel from './user.schema';
import { User } from '../domain/user.entity';
import { Rol } from '../domain/user.interface';

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
		const user = new User('test', 'test@test.com', [Rol.USER], undefined);
		const res = await request(app).post('/').send(user);
		expect(res.statusCode).toEqual(201);
	});
	it('fails creating a new user if some fields are empty', async () => {
		const emptyName = await request(app).post('/').send({name:'', email:''});
		expect(emptyName.statusCode).toEqual(400);
	});
});

describe('PUT /:id', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('updates my user', async () => {
		const user = new User('test', 'test@test.com', [Rol.USER], undefined );
		const saved = await UserModel.create(user);
		const newName='my new name';
		const res = await request(app)
			.put(`/${saved.userId}`)
			.send({name:newName});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe(newName);
	});

});

describe('DELETE /:id', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('deletes a user', async () => {
		const user = new User('test', 'test@test.com', [Rol.USER], undefined );
		const saved = await UserModel.create(user);
		const res = await request(app)
			.delete(`/${saved.userId}`);

		expect(res.statusCode).toEqual(204);
	});

	it('fail deleting a user if not exists', async () => {
		const res = await request(app)
			.delete('/test');

		expect(res.statusCode).toEqual(404);
	});
});

describe('GET /', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('returns a complete list of users', async () => {
		const user1 = new User('test', 'test@test.com', [Rol.USER], undefined);
		const user2 = new User('test2', 'test2@test.com', [Rol.USER], undefined);
		const user3 = new User('test3', 'test3@test.com', [Rol.USER], undefined );
		await UserModel.insertMany([user1, user2,user3]);
		const res = await request(app)
			.get('/');
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBe(3);
	});
});

describe('GET /:id', () => {
	afterAll(async () => {
		await UserModel.deleteMany({});
	});

	it('returns a user', async () => {
		const user = new User('test', 'test@test.com', [Rol.USER], undefined );
		const saved = await UserModel.create(user);
		const res = await request(app)
			.get(`/${saved.userId}`);
		expect(res.statusCode).toEqual(200);
	});
	it('fails returning a user if not exists', async () => {
		const res = await request(app)
			.get('/test');
		expect(res.statusCode).toEqual(404);
	});
});