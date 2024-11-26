import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserService } from './user.service';
import UserModel from '../entities/user.schema';
import { LicenseType, Rol, User, UserDocument } from '../entities/user.interface';

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
			birth_date: new Date('2000-01-01'),
			rol: [Rol.USER],
			car_license: LicenseType.B
		};
		const user = await userService.create(userData);
		expect(user.email).toEqual(userData.email);
		expect(user.name).toEqual(userData.name);
	});

	it('fails creating a new user if some fields are empty', async () => {
		await expect(
			userService.create({
				name: 'test',
				email: '',
				birth_date: new Date('2000-01-01'),
				rol: [Rol.USER],
			car_license: LicenseType.B
			})
		).rejects.toThrow();
		await expect(
			userService.create({
				name: '',
				email: 'test@test.com',
				birth_date: new Date('2000-01-01'),
				rol: [Rol.USER],
			car_license: LicenseType.B
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
			birth_date: new Date('2000-01-01'),
			rol: [Rol.USER],
			car_license: LicenseType.B
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
		const updated = await userService.update(user._id.toString(), newData);
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
		await userService.deleteUser(user._id.toString(), Rol.SUPERADMIN);
		const userFounded = await UserModel.findOne({ _id: user._id });
		expect(userFounded).toBeNull();
	});

	it('fail deleting when rol is wrong', async () => {
		const user = await UserModel.create({
			name: 'test',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		});
		await expect(userService.deleteUser(user._id.toString(), Rol.ADMIN)).rejects.toThrow();
	});

	it('fails deleting a user if uuid is wrong', async () => {
		await UserModel.create({
			name: 'test',
			email: 'test@test.com',
			birth_date: new Date('2000-01-01')
		});
		await expect(userService.deleteUser('abcd', Rol.ADMIN)).rejects.toThrow();
		await expect(userService.deleteUser('', Rol.ADMIN)).rejects.toThrow();
		await expect(userService.deleteUser('true', Rol.ADMIN)).rejects.toThrow();
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