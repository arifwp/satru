import {
  RemixiconComponentType,
  RiDiscountPercentLine,
  RiExchangeDollarLine,
  RiHistoryLine,
  RiHome3Line,
  RiMoneyCnyBoxLine,
  RiOutlet2Line,
  RiProductHuntLine,
  RiUserAddLine,
} from "@remixicon/react";

export interface NavProps {
  id: any;
  icon: RemixiconComponentType;
  label: string;
  to: string;
}

export const navs: Array<NavProps> = [
  { id: 1, icon: RiHome3Line, label: "Dashboard", to: "/dashboard" },
  { id: 2, icon: RiProductHuntLine, label: "Produk", to: "/product" },
  { id: 3, icon: RiExchangeDollarLine, label: "Tranksasi", to: "/transaction" },
  {
    id: 4,
    icon: RiHistoryLine,
    label: "Riwayat Tranksasi",
    to: "/history-transaction",
  },
  { id: 5, icon: RiUserAddLine, label: "Member", to: "/member" },
  { id: 6, icon: RiMoneyCnyBoxLine, label: "Keuangan", to: "/finance" },
  { id: 7, icon: RiDiscountPercentLine, label: "Diskon", to: "/discount" },
  { id: 8, icon: RiOutlet2Line, label: "Outlet", to: "/outlet" },
];
