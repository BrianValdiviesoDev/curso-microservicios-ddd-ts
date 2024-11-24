import mongoose, { Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FamilyService } from './family.service';
import FamilyModel from '../entitites/family.schema';
import UserModel from '../entitites/user.schema';
import { UserDocument } from '../entitites/user.interface';
import { FamilyDocument } from '../entitites/family.interface';


let mongoServer: MongoMemoryServer;
let familyService: FamilyService;

let user:UserDocument;
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = await mongoServer.getUri();
	await mongoose.connect(mongoUri);
	familyService = new FamilyService();    
	user = await UserModel.create( {
		name: 'test',
		email: 'test@test.com',
		birth_date: new Date()
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	// Limpiar la base de datos antes de cada prueba
	await FamilyModel.deleteMany({});
});

describe('createFamily', () => {
	afterEach(async () => {
		await FamilyModel.deleteMany({});
	});

	it('creates a new family', async () => {
		const family = await familyService.createFamily('test', [user._id]);
		expect(family.name).toEqual('test');
		expect(family.members.length).toBe(1);
	});
});


describe('updateFamily', () => {
	let family: FamilyDocument;
	beforeEach(async () => {
		family = await FamilyModel.create({
			name: 'test',
			members: [user._id]
		});
	});

	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await UserModel.deleteMany({});
	});

	it('updates name', async () => {
		const updated = await familyService.updateName(family._id.toString(), 'myFamily');
		expect(updated).not.toBeNull();
	});
    
	it('add member', async () => {
		const updated = await familyService.addMember(family._id.toString(), new Types.ObjectId());
		expect(updated!.members.length).toBe(2);
	});

});

describe('deleteFamily', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await FamilyModel.deleteMany({});
	});

	it('deletes a family', async () => {
		const family = await FamilyModel.create({
			name: 'test',
			members: [user._id]
		});
		await familyService.deleteFamily(family._id.toString());
		const founded = await FamilyModel.findOne({ _id: family._id });
		expect(founded).toBeNull();
	});

	it('fails deleting a family if id is wrong', async () => {
		await FamilyModel.create({
			name: 'test',
			members: [user._id]
		});
		await expect(familyService.deleteFamily('abcd')).rejects.toThrow();
		await expect(familyService.deleteFamily('')).rejects.toThrow();
		await expect(familyService.deleteFamily('true')).rejects.toThrow();
	});

});

describe('listFamilies', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await FamilyModel.deleteMany({});
	});

	it('lists all families', async () => {
		const families = await FamilyModel.create([
			{
				name: 'test',
				members: [new Types.ObjectId()]
			},
			{
				name: 'test2',
				members: [new Types.ObjectId()]
			},
			{
				name: 'test3',
				members: [new Types.ObjectId()]
			},
		]);
		const list = await familyService.listFamilies();
		expect(list.length).toBe(families.length);
	});
});

describe('getFamily', () => {
	afterEach(async () => {
		// Limpiar la base de datos antes de cada prueba
		await FamilyModel.deleteMany({});
	});

	it('returns a family', async () => {
		const family = await FamilyModel.create({
			name: 'test',
			members: [user._id]
		});

		const readFamily = await familyService.getFamily(family._id.toString());
		expect(readFamily).not.toBeNull();
		expect(readFamily!.name).toBe(family.name);
	});
});