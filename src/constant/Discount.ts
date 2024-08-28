export interface DiscountInterface {
  _id: any;
  ownerId: any;
  outletId: any;
  name: string;
  discountType: number;
  discount: number;
  expiredDate: Date;
  createdAt: Date;
}
