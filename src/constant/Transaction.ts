import { DiscountTypeInterface } from "../components/drawer/dedicated/DetailItemDrawer";
import { ProductVariantInterface } from "./Product";

export interface ProductCartInterface {
  _id?: any;
  indexProduct: any;
  userId: any;
  ownerId: any;
  outletId: any;
  code: string;
  name: string;
  qty: number;
  price: number;
  stock: number;
  discount: number;
  discountType: DiscountTypeInterface;
  variants?: Array<ProductVariantInterface>;
  finalPrice?: number;
}

export interface ManualTransactionInterface {
  _id?: any;
  name: string;
  price: number;
}

export interface TransactionInterface {
  _id?: any;
  assignedBy: any;
  ownerId: any;
  customerName?: string;
  totalPrice: number;
  totalDiscountRp?: number;
  totalDiscountPercent?: number;
  product: ProductCartInterface[];
  manualTransaction?: ManualTransactionInterface[];
  isOpen?: number;
  createdAt: Date;
  updatedAt?: Date;
}
