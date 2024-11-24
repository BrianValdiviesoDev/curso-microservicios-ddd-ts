import { Document } from 'mongoose';

export interface User{
    name: string;
    email: string;
    birth_date: Date;
}
  
export interface UserDocument extends User, Document {}