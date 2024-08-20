import { DiscountTypeInterface } from "../components/drawer/dedicated/TransactionDrawer";
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
}

interface ManualTransactionInterface {
  _id?: any;
  name: string;
  price: number;
}

export interface TransactionInterface {
  _id?: any;
  userId: any;
  ownerId: any;
  code?: string;
  customerName?: string;
  totalPrice: number;
  totalDiscount?: number;
  product: ProductCartInterface[];
  manualTransaction?: ManualTransactionInterface[];
  createdAt: Date;
}
