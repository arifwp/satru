import { Link as ChakraLink, TableProps, useToast } from "@chakra-ui/react";
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { formatDateToId, getDataUser } from "../../../utils/helperFunction";
import { CButton } from "../../CButton";
import { Confirmation } from "../../modal/Confirmation";
import { TableSkeleton } from "../../TableSkeleton";
import { CTable } from "../CTable";
import { Empty } from "../../Empty";

interface Props extends TableProps {
  filterSearch: string;
}

export const TableCategory = ({ filterSearch, ...rest }: Props) => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { statusData, setStatusData } = useTriggerRenderStore();
  const toast = useToast();

  useEffect(() => {
    const ownerId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/category/getAllCategory/${ownerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
  }, [statusData, toast]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item, i) => [
        {
          id: "index",
          name: i + 1,
          props: { display: "table-cell" },
        },
        {
          id: "categoryName",
          name: item.name,
          props: { display: "table-cell" },
        },
        {
          id: "dateCreated",
          name: formatDateToId(item.createdAt),
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
                colorScheme={"yellow"}
                icon={RiEdit2Line}
              >
                Edit
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
              colorScheme="red"
              variant={"ghost"}
              message={`Apakah anda yakin ingin menghapus kategori ${item.name}?`}
              url={`/v1/category/deleteCategory/${item._id}`}
              method="delete"
              btnText="Hapus"
              icon={RiDeleteBin2Line}
              onConfirm={(inputValue) => {
                setStatusData();
              }}
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
      id: "categoryName",
      name: "Nama kategori",
      sortable: true,
      onClick: () => sortByColumn("categoryName"),
    },
    {
      id: "dateCreated",
      name: "Tanggal dibuat",
      sortable: true,
      onClick: () => sortByColumn("dateCreated"),
    },
    {
      id: "actionEdit",
      name: "Edit",
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
    return <Empty title="Kategori tidak ditemukan" mt={6} />;
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
