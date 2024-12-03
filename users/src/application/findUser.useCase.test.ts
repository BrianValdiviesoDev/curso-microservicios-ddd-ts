import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserModel from '../infrastructure/user.schema';
import { FindUserUseCase } from './findUser.useCase';
import { UserDbAdapter } from '../infrastructure/userDb.adapter';

let mongoServer: MongoMemoryServer;
let findUserUseCase: FindUserUseCase;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri);
	const dbPort = new UserDbAdapter();
	findUserUseCase = new FindUserUseCase(dbPort);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	// Limpiar la base de datos antes de cada prueba
	await UserModel.deleteMany({});
});

describe('getUser', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('returns a user', async () => {
		const user = await UserModel.create({
			userId: 'test',
			name: 'test1',
			email: 'test@test.com',
			rol:['User'],
			birth_date: new Date(),
		});
		const readUser = await findUserUseCase.execute(user.userId);
		expect(readUser).not.toBeNull();
		expect(readUser!.name).toBe(user.name);
	});
});