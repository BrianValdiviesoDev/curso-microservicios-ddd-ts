import { Document, Types } from 'mongoose';

export interface User{
    name: string;
    email: string;
    birth_date: Date;
}
  
export interface UserDocument extends User, Document {
    _id: Types.ObjectId;
}