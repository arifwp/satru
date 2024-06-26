interface SortProps {
    id: string;
    name: string;
}

export const sort: Array<SortProps> = [
    { id: 'name', name: 'Nama' },
    { id: 'smallestStock', name: 'Stok Terkecil' },
    { id: 'biggestStock', name: 'Stok Terbesar' },
    { id: 'newest', name: 'Terbaru' },
    {id: 'oldest', name: 'Terlama'},
];