interface BusinessTypesInterface {
  id: number;
  name: string;
  optGroup: boolean;
}

export interface OutletInterface {
  _id: any;
  name: string;
  ownerId: any;
  estEmployee: number;
  address: string;
  typeId: any;
  typeoutlet: BusinessTypesInterface;
  createdAt: Date;
}

export const businessType: Array<BusinessTypesInterface> = [
  { id: 1, name: "Makanan & Minuman", optGroup: true },
  { id: 2, name: "Kafe / Coffe Shop", optGroup: false },
  { id: 3, name: "Restoran", optGroup: false },
  { id: 4, name: "Roti, Kue & Camilan", optGroup: false },
  { id: 5, name: "Retail", optGroup: true },
  { id: 6, name: "Toko Kelontong & Retail", optGroup: false },
  { id: 7, name: "Minimarket", optGroup: false },
  { id: 8, name: "Vape Store", optGroup: false },
];
