import {
  RemixiconComponentType,
  RiDiscountPercentLine,
  RiExchangeDollarLine,
  RiHistoryLine,
  RiHome3Line,
  RiMoneyCnyBoxLine,
  RiOutlet2Line,
  RiProductHuntLine,
  RiUser2Line,
  RiUserAddLine,
} from "@remixicon/react";

export interface PageIconNavsProps {
  id: any;
  icon: RemixiconComponentType;
  label: string;
  to: string;
  adminRequired?: boolean;
}

export interface PageNavsProps {
  id: any;
  name: string;
  to: string;
  adminRequired?: boolean;
}

export const navs: Array<PageIconNavsProps> = [
  {
    id: 1,
    icon: RiHome3Line,
    label: "Dashboard",
    to: "/dashboard",
    adminRequired: false,
  },
  {
    id: 2,
    icon: RiProductHuntLine,
    label: "Produk",
    to: "/product",
    adminRequired: false,
  },
  {
    id: 3,
    icon: RiExchangeDollarLine,
    label: "Tranksasi",
    to: "/transaction",
    adminRequired: false,
  },
  {
    id: 4,
    icon: RiHistoryLine,
    label: "Riwayat Tranksasi",
    to: "/history-transaction",
    adminRequired: false,
  },
  {
    id: 5,
    icon: RiUserAddLine,
    label: "Member",
    to: "/member",
    adminRequired: false,
  },
  {
    id: 6,
    icon: RiMoneyCnyBoxLine,
    label: "Keuangan",
    to: "/finance",
    adminRequired: false,
  },
  {
    id: 7,
    icon: RiDiscountPercentLine,
    label: "Diskon",
    to: "/discount",
    adminRequired: false,
  },
  {
    id: 8,
    icon: RiOutlet2Line,
    label: "Outlet",
    to: "/outlet",
    adminRequired: false,
  },
  {
    id: 9,
    icon: RiUser2Line,
    label: "Karyawan",
    to: "/employee",
    adminRequired: true,
  },
];

export const pageNavsProduct: PageNavsProps[] = [
  { id: 1, name: "Product", to: "/product", adminRequired: false },
  { id: 2, name: "Kategori", to: "/product/category", adminRequired: false },
  { id: 3, name: "Merk", to: "/product/brand", adminRequired: false },
  { id: 4, name: "Pajak", to: "/product/tax", adminRequired: true },
];

export const pageNavsTransaction: PageNavsProps[] = [
  { id: 1, name: "Manual", to: "/transaction" },
  { id: 2, name: "Produk", to: "/transaction/product" },
];
