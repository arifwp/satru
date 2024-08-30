import { Link as ChakraLink, TableProps, useToast } from "@chakra-ui/react";
import { RiDeleteBin2Line, RiEdit2Line } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { DiscountInterface } from "../../../constant/Discount";
import { SelectOption } from "../../../constant/SelectOption";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import {
  formatDateToId,
  getUserOrAdminId,
} from "../../../utils/helperFunction";
import { CButton } from "../../CButton";
import { Empty } from "../../Empty";
import { Confirmation } from "../../modal/Confirmation";
import { TableSkeleton } from "../../TableSkeleton";
import { CTable } from "../CTable";

interface Props extends TableProps {
  filterOutlet: SelectOption[] | undefined;
  filterSearch: string;
}

export const TableDiscount = ({
  filterOutlet,
  filterSearch,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DiscountInterface[] | undefined>(undefined);
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
    const userId = getUserOrAdminId();

    const otltIds =
      filterOutlet && (filterOutlet as any[]).map((item) => item._id);
    const outletIds = otltIds && (otltIds as string[]).join(",");

    const request = {
      ownerId: userId,
      page: currentPage,
      limit: limitPagination,
      search: filterSearch,
      outletIds: outletIds,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/discount/getAllDiscount`,
        request,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        setTotalItems(
          JSON.parse(response.request.response).pagination.totalItems
        );
        setTotalPages(
          JSON.parse(response.request.response).pagination.totalPages
        );
        setData(JSON.parse(response.request.response).data);
      })
      .catch((error: AxiosError) => {
        toast({
          title: JSON.parse(error.request.response).message,
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
          props: {
            minWidth: "250px",
            maxWidth: "300px",
            whiteSpace: "pre-wrap",
          },
        },
        {
          id: "discount",
          name:
            item.discountType === 1
              ? `Rp ${item.discount}`
              : `${item.discount}%`,
          props: { textAlign: "end" },
        },
        {
          id: "expiredDate",
          //   name: item.expiredDate,
          name: formatDateToId({ dateString: item.expiredDate.toString() }),
          props: { textAlign: "end" },
        },
        {
          id: "createdAt",
          //   name: item.createdAt,
          name: formatDateToId({
            dateString: item.createdAt.toString(),
          }),
          props: { textAlign: "end" },
        },
        {
          id: "actionEdit",
          name: (
            <ChakraLink
              as={ReactRouterLink}
              to={`edit-discount/${item._id}`}
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
              url={`/v1/discount/deleteDiscount/${item._id}`}
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
      sortable: true,
      onClick: () => sortByColumn("index"),
      props: { justifyContent: "center" },
    },
    {
      id: "name",
      name: "Nama Diskon",
      sortable: true,
      onClick: () => sortByColumn("name"),
    },
    {
      id: "discount",
      name: "Diskon",
      sortable: true,
      onClick: () => sortByColumn("discount"),
    },
    {
      id: "expiredDate",
      name: "Tanggal Berakhir",
      sortable: true,
      onClick: () => sortByColumn("expiredDate"),
    },
    {
      id: "createdAt",
      name: "Tanggal Dibuat",
      sortable: true,
      onClick: () => sortByColumn("createdAt"),
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
    return <Empty title="Diskon tidak ditemukan" mt={6} />;
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
