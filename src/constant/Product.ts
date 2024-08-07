import { BrandInterface } from "./Brand";
import { CategoryInterface } from "./Category";
import { OutletInterface } from "./Outlet";

export interface ProductVariantInterface {
  _id?: any;
  variantId: any;
  variantName: string;
  variantPrice: number;
  variantStock: number;
}

export interface ProductInterface {
  _id: any;
  ownerId: any;
  outletId: any;
  code: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category: CategoryInterface;
  brandId: string;
  brand: BrandInterface;
  outlet: OutletInterface[];
  stock: number;
  minimumStock: number;
  imageProduct: string;
  variants?: Array<ProductVariantInterface>;
  createdAt: Date;
}
