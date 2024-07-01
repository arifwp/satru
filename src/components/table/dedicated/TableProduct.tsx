import { AspectRatio, Image, TableProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";
import { CTable } from "../CTable";
import { TableSkeleton } from "../../TableSkeleton";

const product: Array<ProductInterface> = [
  {
    id: 1,
    productCode: "STR-001",
    img: "https://placehold.co/600x400",
    name: "Macbook jaya selamanya",
    price: 12000000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "1",
      name: "Apple",
    },
    stock: 12,
    haveVariant: false,
    variantItem: undefined,
  },
  {
    id: 2,
    productCode: "STR-002",
    img: "https://placehold.co/600x400",
    name: "Lenovo Gila",
    price: 9000000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "2",
      name: "Lenovo",
    },
    stock: 8,
    haveVariant: true,
    variantItem: [
      {
        variantId: 1,
        variantName: "Lenovo LOQ",
        variantPrice: 18000000,
        variantStock: 12,
      },
      {
        variantId: 2,
        variantName: "Lenovo Dell",
        variantPrice: 12000000,
        variantStock: 9,
      },
    ],
  },
  {
    id: 3,
    productCode: "STR-003",
    img: "https://placehold.co/600x400",
    name: "Asus Pro Art Jelek",
    price: 12000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "3",
      name: "Asus",
    },
    stock: 3,
    haveVariant: true,
    variantItem: [
      {
        variantId: 4,
        variantName: "Asus ROG Strix G16",
        variantPrice: 5000000,
        variantStock: 4,
      },
      {
        variantId: 1,
        variantName: "Asus Zephyrus G14",
        variantPrice: 3000000,
        variantStock: 19,
      },
    ],
  },
  {
    id: 4,
    productCode: "STR-004",
    img: "https://placehold.co/600x400",
    name: "MSI Gaming",
    price: 14500000,
    category: {
      id: "1",
      name: "Laptop",
    },
    brand: {
      id: "4",
      name: "MSI",
    },
    stock: 5,
    haveVariant: true,
    variantItem: [
      {
        variantId: 10,
        variantName: "MSI Stealth",
        variantPrice: 12000500,
        variantStock: 12,
      },
      {
        variantId: 20,
        variantName: "MSI Modern 14",
        variantPrice: 7000000,
        variantStock: 9,
      },
    ],
  },
];

interface Props extends TableProps {
  filterCategory: SelectOption | undefined;
  filterSort: SelectOption | undefined;
  filterSearch: string;
}

export const TableProduct = ({
  filterCategory,
  filterSort,
  filterSearch,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  console.log(filterSearch);
  useEffect(() => {
    setData(product);
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, [data, filterSort, filterCategory, filterSearch]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const formattedData = data.map((item) => [
        { id: "id", name: item.id, display: "none", dataType: "string" },
        {
          id: "productCode",
          name: item.productCode,
          display: "visible",
          dataType: "string",
        },
        {
          id: "img",
          name: (
            <AspectRatio maxW={"100px"} minW={"75px"} ratio={4 / 3}>
              <Image src={item.img} objectFit={"cover"} />
            </AspectRatio>
          ),
          display: "table-cell",
          dataType: "image",
        },
        {
          id: "name",
          name: item.name,
          display: "table-cell",
          dataType: "string",
        },
        {
          id: "category",
          name: item.category.name,
          display: "table-cell",
          dataType: "string",
        },
        {
          id: "brand",
          name: item.brand.name,
          display: "table-cell",
          dataType: "string",
        },
        {
          id: "price",
          name: item.price,
          display: "table-cell",
          dataType: "number",
        },
        {
          id: "stock",
          name: item.stock,
          display: "table-cell",
          dataType: "number",
        },
        {
          id: "haveVariant",
          name: item.haveVariant,
          display: "none",
          dataType: "boolean",
        },
      ]);

      setValue(formattedData);
    }
  }, [data]);

  const sortByColumn = (columnId: string) => {
    setSortedColumn((prevColumnId) => {
      const newSortOrder =
        prevColumnId === columnId
          ? sortOrder === "asc"
            ? "desc"
            : "asc"
          : "asc";

      const sortedData = [...value].sort((a, b) => {
        const aValue = a.find((col: any) => col.id === columnId)?.name;
        const bValue = b.find((col: any) => col.id === columnId)?.name;
        if (aValue < bValue) return newSortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      });

      setSortOrder(newSortOrder);
      setValue(sortedData);
      return columnId;
    });
  };

  const columnHeader = [
    {
      id: "productCode",
      name: "Kode Produk",
      sortable: true,
      onClick: () => sortByColumn("productCode"),
    },
    { id: "img", name: "Foto", sortable: false, onClick: undefined },
    {
      id: "name",
      name: "Nama",
      sortable: true,
      onClick: () => sortByColumn("name"),
    },
    { id: "category", name: "Kategori", sortable: false, onClick: undefined },
    { id: "brand", name: "Merk", sortable: false, onClick: undefined },
    {
      id: "price",
      name: "Harga",
      sortable: true,
      onClick: () => sortByColumn("price"),
    },
    {
      id: "stock",
      name: "Stok",
      sortable: true,
      onClick: () => sortByColumn("stock"),
    },
  ];

  if (!loaded) {
    return <TableSkeleton row={5} column={10} />;
  }

  return (
    <CTable
      columnHeader={columnHeader}
      data={value}
      sortedColumn={sortedColumn}
      sortOrder={sortOrder}
      {...rest}
    />
  );
};
