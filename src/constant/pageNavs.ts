export interface PageNavsProps {
  id: any;
  label: string;
  to: string;
}

export const pageNavsProduct: PageNavsProps[] = [
  { id: 1, label: "Product", to: "/product" },
  { id: 2, label: "Kategori", to: "/product/category" },
  { id: 3, label: "Merk", to: "/product/brand" },
];
