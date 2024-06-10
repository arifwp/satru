interface BusinessTypeProps {
    id: number;
    name: string;
    optGroup: boolean;
}

export const businessType: Array<BusinessTypeProps> = [
    { id: 1, name: 'Makanan & Minuman', optGroup: true },
    { id: 2, name: 'Kafe / Coffe Shop', optGroup: false },
    { id: 3, name: 'Restoran', optGroup: false },
    { id: 4, name: 'Roti, Kue & Camilan', optGroup: false },
    { id: 5, name: 'Retail', optGroup:true },
    { id: 6, name: 'Toko Kelontong & Retail', optGroup: false },
    { id: 7, name: 'Minimarket', optGroup: false },
    { id: 8, name: 'Vape Store', optGroup:false },
];

