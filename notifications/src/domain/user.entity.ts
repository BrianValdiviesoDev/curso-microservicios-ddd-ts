import { IUser } from './user.interface';

export class User implements IUser{
	userId: string;
	name: string;
	email: string;
	phone_number?: number;
	notifications_consent?: boolean;
	constructor(
		userId: string,
		name: string,
		email: string,
		phone_number?: number,
		notifications_consent?: boolean
	) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.phone_number = phone_number;
		this.notifications_consent = notifications_consent;
	}
}