export interface UserInterface {
  _id: any;
  ownerId?: string;
  name: string;
  email: string;
  phone: string;
  owner: boolean;
  bornDate: Date;
  status: number;
  createdAt: Date;
  lastLogin: Date;
  token: string;
  avatar: string;
}
