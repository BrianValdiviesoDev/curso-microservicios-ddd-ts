import request from 'supertest';
import { app } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Types } from 'mongoose';
import FamilyModel from '../entitites/family.schema';

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

describe('POST /families/', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('creates a new family', async () => {
		const res = await request(app).post('/families/').send({
			name: 'test',
			members: [new Types.ObjectId()] 
		});
		expect(res.statusCode).toEqual(201);
	});
	it('fails creating a new family if some fields are empty', async () => {
		const emptyName = await request(app).post('/families/').send({
			name: '',
			members: [new Types.ObjectId()] 
		});
		expect(emptyName.statusCode).toEqual(400);
	});
});

describe('PATCH /families/:id', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('updates family name', async () => {
		const existing = await FamilyModel.create({
			name: 'test',
			members: [new Types.ObjectId()] 
		});
		const res = await request(app)
			.patch(`/families/${existing._id}`)
			.send({name: 'my new name'});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe('my new name');
	});

});

describe('PUT /families/:id/member', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('add a family member', async () => {
		const existing = await FamilyModel.create({
			name: 'test',
			members: [new Types.ObjectId()] 
		});
		const res = await request(app)
			.put(`/families/${existing._id}/member`)
			.send({memberId: new Types.ObjectId()});
		expect(res.statusCode).toEqual(200);
		expect(res.body.members.length).toBe(2);
	});

});

describe('DELETE /families/:id', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('deletes a family', async () => {
		const family = await FamilyModel.create({
			name: 'test',
			members: [new Types.ObjectId()] 
		});
		const res = await request(app)
			.delete(`/families/${family._id}`);

		expect(res.statusCode).toEqual(200);
	});

	it('fail deleting a family if not exists', async () => {
		const res = await request(app)
			.delete(`/families/${new Types.ObjectId()}`);

		expect(res.statusCode).toEqual(404);
	});
});

describe('GET /families/', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('returns a complete list of families', async () => {
		await FamilyModel.insertMany([
			{
				name: 'testuser',
				members: [new Types.ObjectId()] 
			},
			{
				name: 'testuser2',
				members: [new Types.ObjectId()] 
			},
			{
				name: 'testuser3',
				members: [new Types.ObjectId()] 
			}
		]);
		const res = await request(app)
			.get('/families/');
		expect(res.statusCode).toEqual(200);

		const list = await FamilyModel.find({});
		expect(res.body.length).toBe(list.length);
	});
});

describe('GET /families/:id', () => {
	afterAll(async () => {
		await FamilyModel.deleteMany({});
	});

	it('returns a family', async () => {
		const family = await FamilyModel.create({
			name: 'testuser',
			members: [new Types.ObjectId()] 
		});
		const res = await request(app)
			.get(`/families/${family._id}`);
        
		expect(res.statusCode).toEqual(200);
	});
	it('fails returning a family if not exists', async () => {
		const res = await request(app)
			.get(`/families/${new Types.ObjectId()}`);
		expect(res.statusCode).toEqual(404);
	});
});