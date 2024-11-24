import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserService } from './user.service';
import UserModel from '../entitites/user.schema';
import { User, UserDocument } from '../entitites/user.interface';

let mongoServer: MongoMemoryServer;
let userService: UserService;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri);
	userService = new UserService();
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	// Limpiar la base de datos antes de cada prueba
	await UserModel.deleteMany({});
});

describe('createUser', () => {
	afterEach(async () => {
		await UserModel.deleteMany({});
	});

	it('creates a new user', async () => {
		const userData: User = {
			name: 'testuser',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		};
		const user = await userService.createUser(userData);
		expect(user.email).toEqual(userData.email);
		expect(user.name).toEqual(userData.name);
	});

	it('fails creating a new user if some fields are empty', async () => {
		await expect(
			userService.createUser({
				name: 'test',
				email: '',
				birth_date: new Date('2000-01-01')
			})
		).rejects.toThrow();
		await expect(
			userService.createUser({
				name: '',
				email: 'test@test.com',
				birth_date: new Date('2000-01-01')
			})
		).rejects.toThrow();
	});
});


describe('updateUser', () => {
	let user: UserDocument;
	beforeEach(async () => {
		user = await UserModel.create({
			name: 'test',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		});
	});

	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('updates a user', async () => {
		const newData = {
			name: 'updated name',
		};
		const updated = await userService.updateUser(user._id.toString(), newData);
		expect(updated).not.toBeNull();
	});
});

describe('deleteUser', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('deletes a user', async () => {
		const user = await UserModel.create({
			name: 'test',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		});
		await userService.deleteUser(user._id.toString());
		const userFounded = await UserModel.findOne({ _id: user._id });
		expect(userFounded).toBeNull();
	});

	it('fails deleting a user if uuid is wrong', async () => {
		await UserModel.create({
			name: 'test',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		});
		await expect(userService.deleteUser('abcd')).rejects.toThrow();
		await expect(userService.deleteUser('')).rejects.toThrow();
		await expect(userService.deleteUser('true')).rejects.toThrow();
	});

});

describe('listUsers', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('lists all users', async () => {
		const users = await UserModel.create([
			{
				name: 'test1',
				email: 'test1@test.com',
				birth_date: new Date()
			},
			{
				name: 'test2',
				email: 'test2@test.com',
				birth_date: new Date()
			},
			{
				name: 'test3',
				email: 'test3@test.com',
				birth_date: new Date()
			},
		]);
		const list = await userService.listUsers();
		expect(list.length).toBe(users.length);
	});
});

describe('getUser', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('returns a user', async () => {
		const user = await UserModel.create({
			name: 'test1',
			email: 'test@test.com',
			birth_date: new Date(),
		});

		const readUser = await userService.getUser(user._id.toString());
		expect(readUser).not.toBeNull();
		expect(readUser!.name).toBe(user.name);
	});
});