import {
  AspectRatio,
  Link as ChakraLink,
  Image,
  TableProps,
  useToast,
} from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiDeleteBin2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { ProductInterface } from "../../../constant/Product";
import { SelectOption } from "../../../constant/SelectOption";
import formatNumber from "../../../lib/formatNumber";
import { getDataUser } from "../../../utils/helperFunction";
import { CButton } from "../../CButton";
import { Empty } from "../../Empty";
import { Confirmation } from "../../modal/Confirmation";
import { TableSkeleton } from "../../TableSkeleton";
import { CTable } from "../CTable";

interface Props extends TableProps {
  filterOutlet: SelectOption[] | undefined;
  filterCategory: SelectOption[] | undefined;
  filterSearch: string;
}

export const TableProduct = ({
  filterOutlet,
  filterCategory,
  filterSearch,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<ProductInterface[] | undefined>(undefined);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");
    const ownerId = getDataUser()._id;
    let url;

    if (
      filterOutlet &&
      filterOutlet.length !== 0 &&
      filterCategory &&
      filterCategory.length !== 0
    ) {
      const otltIds = filterOutlet.map((item) => item._id);
      const outletIds = otltIds.join(",");

      const ctgIds = filterCategory.map((item) => item._id);
      const categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutletCategory/${ownerId}/${outletIds}/${categoryIds}`;
    } else if (filterCategory && filterCategory.length > 0) {
      const ctgIds = filterCategory.map((item) => item._id);
      const categoryIds = ctgIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByCategory/${ownerId}/${categoryIds}`;
    } else if (filterOutlet && filterOutlet.length > 0) {
      const otltIds =
        filterOutlet && (filterOutlet as any[]).map((item) => item._id);
      const outletIds = otltIds && (otltIds as string[]).join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProductByOutlet/${ownerId}/${outletIds}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/v1/product/getAllProduct/${ownerId}`;
    }

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        setData(JSON.parse(response.request.response).data);
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
          status: "error",
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [filterOutlet, filterCategory, filterSearch, toast]);

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item, i) => [
        {
          id: "index",
          name: i + 1,
          props: { display: "table-cell", textAlign: "center" },
        },
        {
          id: "code",
          name: item.code,
          props: { display: "table-cell" },
        },
        {
          id: "img",
          name: (
            <AspectRatio
              visibility={item.imageProduct ? "visible" : "hidden"}
              maxW={"100px"}
              minW={"75px"}
              ratio={4 / 3}
            >
              <Image
                src={`http://localhost:3000/uploads/products/${item.imageProduct}`}
                alt={item.name}
                objectFit={"cover"}
              />
            </AspectRatio>
          ),
          props: {
            display: "table-cell",
          },
        },
        {
          id: "name",
          name: item.name,
          props: { display: "table-cell" },
        },
        {
          id: "category",
          name: item.category.name,
          props: { display: "table-cell" },
        },
        {
          id: "brand",
          name: item.brand ? item.brand.name : "",
          props: { display: "table-cell" },
        },
        {
          id: "price",
          name: formatNumber(item.price),
          props: { display: "table-cell" },
        },
        {
          id: "stock",
          name: item.stock,
          props: { display: "table-cell" },
        },
        {
          id: "actionDetail",
          name: (
            <ChakraLink
              as={ReactRouterLink}
              to={`product/detail-product/${item._id}`}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <CButton
                variant={"ghost"}
                size={"xs"}
                colorScheme={"teal"}
                icon={RiArrowLeftDoubleLine}
              >
                Detail
              </CButton>
            </ChakraLink>
          ),
          props: { display: "table-cell" },
        },
        {
          id: "actionDelete",
          name: (
            <Confirmation
              size={"xs"}
              method="post"
              colorScheme="red"
              variant={"ghost"}
              message={`Apakah anda yakin ingin menghapus item ${item.name}?`}
              url={``}
              btnText="Hapus"
              icon={RiDeleteBin2Line}
            />
          ),
          props: { display: "table-cell" },
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
      id: "index",
      name: "No.",
      sortable: true,
      onClick: () => sortByColumn("index"),
      props: { justifyContent: "center" },
    },
    {
      id: "code",
      name: "Kode Produk",
      sortable: true,
      onClick: () => sortByColumn("code"),
    },
    { id: "img", name: "Foto", sortable: false, onClick: undefined },
    {
      id: "name",
      name: "Nama",
      sortable: true,
      onClick: () => sortByColumn("name"),
    },
    {
      id: "category",
      name: "Kategori",
      sortable: undefined,
      onClick: undefined,
    },
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
    {
      id: "actionDetail",
      name: "Detail",
      sortable: false,
      onClick: undefined,
      props: { justifyContent: "center" },
    },
    {
      id: "actionDelete",
      name: "Hapus",
      sortable: false,
      onClick: undefined,
      props: { justifyContent: "center" },
    },
  ];

  if (!loaded) {
    return <TableSkeleton row={5} column={10} />;
  } else if (loaded && value && value.length < 1) {
    return <Empty title="Produk tidak ditemukan" mt={6} />;
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
