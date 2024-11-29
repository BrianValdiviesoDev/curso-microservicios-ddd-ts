import { Document, Types } from 'mongoose';


export interface Family{
    name: string;
    members: Types.ObjectId[];
    vehicles: Types.ObjectId[];
}
  
export interface FamilyDocument extends Family, Document {
    _id: Types.ObjectId;
}