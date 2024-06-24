interface OutletProps {
    id: string;
    outletName: string;
    location: string;
}

export const outlet: Array<OutletProps> = [
    { id: '1', outletName: 'Pusat', location: 'Donohudan' },
    { id: '2', outletName: 'Cabang Margonda', location: 'Margonda' },
    {id: '3', outletName: 'Cabang Semarang', location: 'Semarang'},
    {id: '4', outletName: 'Cabang Yogyakarta', location: 'Yogyakarta'},
];