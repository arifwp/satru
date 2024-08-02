export interface PageNavsProps {
  id: any;
  name: string;
  to: string;
}

export const pageNavsProduct: PageNavsProps[] = [
  { id: 1, name: "Product", to: "/product" },
  { id: 2, name: "Kategori", to: "/product/category" },
  { id: 3, name: "Merk", to: "/product/brand" },
];

export const pageNavsTransaction: PageNavsProps[] = [
  { id: 1, name: "Manual", to: "/transaction" },
  { id: 2, name: "Produk", to: "/transaction/product" },
];
