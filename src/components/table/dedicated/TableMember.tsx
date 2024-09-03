import { TableProps, useToast, Link as ChakraLink } from "@chakra-ui/react";
import { SelectOption } from "../../../constant/SelectOption";
import { useEffect, useState } from "react";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { DiscountInterface } from "../../../constant/Discount";
import { MemberInterface } from "../../../constant/Member";
import { getCookie } from "typescript-cookie";
import {
  formatDateToId,
  getDataUser,
  getUserOrAdminId,
} from "../../../utils/helperFunction";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Link as ReactRouterLink } from "react-router-dom";
import { CButton } from "../../CButton";
import { RiArrowLeftDoubleLine, RiDeleteBin2Line } from "@remixicon/react";
import { Confirmation } from "../../modal/Confirmation";
import { TableSkeleton } from "../../TableSkeleton";
import { Empty } from "../../Empty";
import { CTable } from "../CTable";

interface Props extends TableProps {
  filterOutlet: SelectOption[] | undefined;
  filterSearch: string;
}

export const TableMember = ({ filterOutlet, filterSearch }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<MemberInterface[] | undefined>(undefined);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();
  const { statusData, setStatusData } = useTriggerRenderStore();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [limitPagination, setLimitPagination] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const token = getCookie("token");
    const ownerId = getUserOrAdminId();

    const otltIds =
      filterOutlet && (filterOutlet as any[]).map((item) => item._id);
    const outletIds = otltIds && (otltIds as string[]).join(",");

    const request = {
      outletId: outletIds,
      ownerId: ownerId,
      page: currentPage,
      limit: limitPagination,
      search: filterSearch,
      outletIds: outletIds,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/member/getAllMember`,
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
  }, [
    filterSearch,
    filterOutlet,
    toast,
    statusData,
    currentPage,
    limitPagination,
  ]);

  useEffect(() => {
    if (data) {
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
          id: "email",
          name: item.email,
          props: { textAlign: "start" },
        },
        {
          id: "phone",
          name: item.phone,
          props: { textAlign: "start" },
        },
        {
          id: "bornDate",
          name: formatDateToId(item.bornDate as any),
          props: { textAlign: "start" },
        },
        {
          id: "totalTransaction",
          name: item.totalTransaction,
          props: { textAlign: "start" },
        },
        {
          id: "createdAt",
          name: formatDateToId(item.createdAt as any),
          props: { textAlign: "start" },
        },
        {
          id: "actionDetail",
          name: (
            <ChakraLink
              as={ReactRouterLink}
              to={`detail-member/${item._id}`}
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
              message={`Apakah anda yakin ingin menghapus member ${item.name}?`}
              url={`/v1/member/deleteMember/${item._id}`}
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
      name: "Nama",
      onClick: () => sortByColumn("name"),
    },
    {
      id: "email",
      name: "Email",
      onClick: undefined,
    },
    {
      id: "phone",
      name: "Phone",
      onClick: undefined,
    },
    {
      id: "bornDate",
      name: "Tanggal Lahir",
      onClick: () => sortByColumn("bornDate"),
    },
    {
      id: "totalTransaction",
      name: "Tranksasi",
      onClick: () => sortByColumn("totalTransaction"),
    },
    {
      id: "createdAt",
      name: "Dibuat Tanggal",
      onClick: () => sortByColumn("createdAt"),
    },
    {
      id: "actionDetail",
      name: "Detail",
      onClick: undefined,
      props: { justifyContent: "center" },
    },
    {
      id: "actionDelete",
      name: "Hapus",
      onClick: undefined,
      props: { justifyContent: "center" },
    },
  ];

  if (!loaded) {
    return <TableSkeleton row={5} column={10} />;
  } else if (loaded && value && value.length < 1) {
    return <Empty title="Member tidak ditemukan" mt={6} />;
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
    />
  );
};
