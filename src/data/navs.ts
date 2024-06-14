import { RemixiconComponentType, RiDiscountPercentLine, RiExchangeDollarLine, RiHistoryLine, RiHome3Line, RiMoneyCnyBoxLine, RiOutlet2Line, RiProductHuntLine, RiUserAddLine } from "@remixicon/react";

interface NavProps {
    icon: RemixiconComponentType;
    label: string;
    to: string;
}

export const navs: Array<NavProps> = [
    { icon: RiHome3Line, label: 'Dashboard', to:'/Dashboard' },
    { icon: RiProductHuntLine, label: 'Produk', to:'/product' },
    {icon: RiExchangeDollarLine, label:'Tranksasi', to:'/transaction'},
    {icon: RiHistoryLine, label:'Riwayat Tranksasi', to:'/history-transaction'},
    {icon: RiUserAddLine, label:'Member', to:'/member'},
    { icon: RiMoneyCnyBoxLine, label: 'Keuangan', to: '/finance' },
    { icon: RiDiscountPercentLine, label: 'Diskon', to: '/discount' },
    {icon: RiOutlet2Line, label:'Outlet', to:'/outlet'},
];