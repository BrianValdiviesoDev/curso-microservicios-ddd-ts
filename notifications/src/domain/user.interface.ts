export interface IUser {
    userId: string;
    name: string;
    email: string;
    phone_number?: number;
    notifications_consent?: boolean;
  }