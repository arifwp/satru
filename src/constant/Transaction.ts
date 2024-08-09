import { ProductInterface, ProductVariantInterface } from "./Product";

export interface ProductCartInterface {
  _id?: any;
  userId: any;
  ownerId: any;
  outletId: any;
  code: string;
  name: string;
  qty: number;
  price: number;
  stock: number;
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
  product: ProductCartInterface[];
  manualTransaction?: ManualTransactionInterface[];
  createdAt: Date;
}
