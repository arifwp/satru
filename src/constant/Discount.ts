import { OutletInterface } from "./Outlet";

export interface DiscountInterface {
  _id: any;
  ownerId: any;
  outletId: any;
  outlet: OutletInterface[];
  name: string;
  discountType: number;
  discount: number;
  expiredDate: Date;
  createdAt: Date;
}
