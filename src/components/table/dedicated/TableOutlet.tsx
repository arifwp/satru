import { Link as ChakraLink, TableProps, useToast } from "@chakra-ui/react";
import { RiArrowLeftDoubleLine, RiDeleteBin2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { OutletInterface } from "../../../constant/Outlet";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { getUserOrAdminId } from "../../../utils/helperFunction";
import { CButton } from "../../CButton";
import { Empty } from "../../Empty";
import { Confirmation } from "../../modal/Confirmation";
import { TableSkeleton } from "../../TableSkeleton";
import { CTable } from "../CTable";

interface Props extends TableProps {
  filterSearch: string;
}

export const TableOutlet = ({ filterSearch, ...rest }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<OutletInterface[] | undefined>(undefined);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { statusData, setStatusData } = useTriggerRenderStore();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [limitPagination, setLimitPagination] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    const token = getCookie("token");
    const userId = getUserOrAdminId();

    const request = {
      ownerId: userId,
      page: currentPage,
      limit: limitPagination,
      search: filterSearch,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/outlet/getAllOutlet`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        setTotalItems(JSON.parse(res.request.response).pagination.totalItems);
        setTotalPages(JSON.parse(res.request.response).pagination.totalPages);
        setData(JSON.parse(res.request.response).data);
      })
      .catch((err: AxiosError) => {
        toast({
          title: JSON.parse(err.request.response).message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoaded(true);
      });
  }, [toast, filterSearch, statusData, currentPage, limitPagination]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item, i) => [
        {
          id: "index",
          name: i + 1,
          props: { textAlign: "center" },
        },
        {
          id: "name",
          name: item.name,
          props: { textAlign: "start" },
        },
        {
          id: "estEmployee",
          name: item.estEmployee,
          props: { textAlign: "end" },
        },
        {
          id: "address",
          name: item.address,
          props: {
            textAlign: "start",
            minWidth: "250px",
            maxWidth: "300px",
            whiteSpace: "pre-wrap",
            isTruncated: true,
          },
        },
        {
          id: "typeOutlet",
          name: item.typeoutlet.name,
          props: { textAlign: "start" },
        },
        {
          id: "actionDetail",
          name: (
            <ChakraLink
              as={ReactRouterLink}
              to={`detail-outlet/${item._id}`}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <CButton
                variant="ghost"
                size={"xs"}
                colorScheme="teal"
                icon={RiArrowLeftDoubleLine}
              >
                Detail
              </CButton>
            </ChakraLink>
          ),
        },
        {
          id: "actionDelete",
          name: (
            <Confirmation
              size={"xs"}
              method="delete"
              colorScheme="red"
              variant={"ghost"}
              message={`Apakah anda yakin ingin menghapus item ${item.name}?`}
              url={`/v1/outlet/deleteOutlet/${item._id}`}
              btnText="Hapus"
              icon={RiDeleteBin2Line}
              onConfirm={(inputValue) => {
                setStatusData();
              }}
            />
          ),
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
      onClick: () => sortByColumn("index"),
      props: { justifyContent: "center" },
    },
    {
      id: "name",
      name: "Nama Outlet",
      sortable: true,
      onClick: () => sortByColumn("name"),
    },
    {
      id: "estEmployee",
      name: "Karyawan",
      sortable: true,
      onClick: () => sortByColumn("estEmployee"),
    },
    {
      id: "address",
      name: "Alamat",
      sortable: true,
      onClick: () => sortByColumn("address"),
    },
    {
      id: "typeOutlet",
      name: "Tipe Outlet",
      sortable: true,
      onClick: () => sortByColumn("typeOutlet"),
    },
    {
      id: "actionDetail",
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
    return <Empty title="Outlet tidak ditemukan" mt={6} />;
  }

  return (
    <CTable
      columnHeader={columnHeader}
      data={value}
      sortedColumn={sortedColumn}
      sortOrder={sortOrder}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={(inputValue) => {
        setCurrentPage(inputValue);
      }}
      onLimitChange={(inputValue) => {
        setLimitPagination(inputValue);
      }}
      {...rest}
    />
  );
};
