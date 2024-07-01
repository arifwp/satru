import { BrandInterface } from "./Brand";
import { CategoryInterface } from "./Category";

export interface ProductVariantInterface {
    variantId: any;
    variantName: string;
    variantPrice: number;
    variantStock: number;
}

export interface ProductInterface {
    id: any;
    productCode: string;
    img: string;
    name: string;
    price: number;
    category: CategoryInterface;
    brand: BrandInterface;
    stock: number;
    haveVariant: boolean;
    variantItem?: Array<ProductVariantInterface>
}