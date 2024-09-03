import { OutletInterface } from "./Outlet";

export interface MemberInterface {
  _id: any;
  ownerId: any;
  assignedBy: any;
  name: string;
  email?: string;
  phone: string;
  bornDate: Date;
  totalTransaction: number;
  createdAt: Date;
}
