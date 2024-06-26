export interface CategoryProps {
    id: string;
    name: string;
} 

export const category: Array<CategoryProps> = [
    { id: '1', name: 'Buah' },
    { id: '2', name: 'Sayuran' },
    { id: '3', name: 'Smartphone' },
    { id: '4', name: 'Laptop' },
    // { id: '5', name: 'Makanan' },
    { id: '5', name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at lacus augue. Mauris scelerisque eros eu dapibus rutrum. Proin ut libero lobortis, hendrerit urna eget, mattis ante. Curabitur nec hendrerit velit, non viverra tellus. Nunc eget eros sed urna facilisis aliquam ac vitae dui. Mauris scelerisque massa sed venenatis ornare. Donec placerat diam eget condimentum egestas. Proin vitae lorem varius, maximus nunc ut, feugiat velit. Sed sit amet arcu quis erat luctus condimentum eget in lorem' },
    { id: '6', name:'Minuman'},
];