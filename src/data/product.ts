import { BrandProps } from "./brand";
import { CategoryProps } from "./category";

interface ProductVariantProps {
    variantName: string;
    variantPrice: number;
    variantStock: number;
}

interface ProductProps {
    id: string;
    productCode: string;
    img: string;
    name: string;
    price: number;
    category: CategoryProps;
    brand: BrandProps;
    stock: number;
    haveVariant: boolean;
    variantItem?: Array<ProductVariantProps>
}

export const product: Array<ProductProps> = [
    {
        id: '1',
        productCode: 'STR-001',
        img: 'https://placehold.co/600x400',
        name: 'Buah Mangga',
        price: 12000,
        category: {
            id: '1',
            name:'Buah'
        },
        brand: {
            id: '1',
            name: 'Oppo'
        },
        stock: 12,
        haveVariant: false,
        variantItem: undefined
    },
    {
        id: '2',
        productCode: 'STR-021',
        img: 'https://placehold.co/600x400',
        name: 'Asus Pro Art Jelek',
        price: 12000,
        category: {
            id: '4',
            name:'Laptop'
        },
        brand: {
            id: '2',
            name: 'Asus'
        },
        stock: 12,
        haveVariant: true,
        variantItem: [
            { variantName: 'Macbook Pro M3 Pro', variantPrice: 32000000, variantStock: 12 },
            {variantName: 'Asus Pro Art jelek', variantPrice: 12000000, variantStock: 9}
        ],
    },
    {
        id: '3',
        productCode: 'STR-021',
        img: 'https://placehold.co/600x400',
        name: 'Asus Pro Art Jelek',
        price: 12000,
        category: {
            id: '4',
            name:'Laptop'
        },
        brand: {
            id: '2',
            name: 'Asus'
        },
        stock: 12,
        haveVariant: true,
        variantItem: [
            { variantName: 'Macbook Pro M3 Pro', variantPrice: 32000000, variantStock: 12 },
            {variantName: 'Asus Pro Art jelek', variantPrice: 12000000, variantStock: 9}
        ],
    },
    {
        id: '4',
        productCode: 'STR-021',
        img: 'https://placehold.co/600x400',
        name: 'Asus Pro Art Jelek',
        price: 12000,
        category: {
            id: '4',
            name:'Laptop'
        },
        brand: {
            id: '2',
            name: 'Asus'
        },
        stock: 12,
        haveVariant: true,
        variantItem: [
            { variantName: 'Macbook Pro M3 Pro', variantPrice: 32000000, variantStock: 12 },
            {variantName: 'Asus Pro Art jelek', variantPrice: 12000000, variantStock: 9}
        ],
    },
];