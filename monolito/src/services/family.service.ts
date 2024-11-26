import { DeleteResult, Types } from 'mongoose';
import { FamilyDocument } from '../entitites/family.interface';
import FamilyModel from '../entitites/family.schema';


export class FamilyService {
	async createFamily(name:string, members: Types.ObjectId[]): Promise<FamilyDocument> {
		return await FamilyModel.create({
			name,
			members
		});
	}

	async updateName(
		_id: string,
		name:string
	  ): Promise<FamilyDocument | null> {
		const updated = await FamilyModel.findByIdAndUpdate(
		  new Types.ObjectId(_id),
			{ $set: { name } },
		  { new: true}
		);
	  
		return updated;
	}
    
	async addMember(_id: string, memberId: Types.ObjectId): Promise<FamilyDocument | null>{
		return await FamilyModel.findByIdAndUpdate(
			new Types.ObjectId(_id),
			{ $push: { members: memberId } },
		  { new: true}
		);
	}

	async deleteFamily(_id: string): Promise<DeleteResult> {
		return await FamilyModel.deleteOne({ _id: new Types.ObjectId(_id) });
	}

	async listFamilies(): Promise<FamilyDocument[]> {
		return await FamilyModel.find({}).populate('members');
	}

	async getFamily(_id: string): Promise<FamilyDocument | null> {
		return await FamilyModel.findById(new Types.ObjectId(_id)).populate('members');
	}

	async addVehicle(_id: string, vehicleId: Types.ObjectId): Promise<FamilyDocument | null>{
		return await FamilyModel.findByIdAndUpdate(
			new Types.ObjectId(_id),
			{ $push: { vehicles: vehicleId } },
		  { new: true}
		);
	}
}