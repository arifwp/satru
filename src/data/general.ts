interface SortProps {
    key: string;
    label: string;
}

export const sort: Array<SortProps> = [
    { key: 'name', label: 'Nama' },
    { key: 'smallestStock', label: 'Stok Terkecil' },
    { key: 'biggestStock', label: 'Stok Terbesar' },
    { key: 'newest', label: 'Terbaru' },
    {key: 'oldest', label: 'Terlama'},
];