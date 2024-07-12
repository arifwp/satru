import { TableProps, useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { getDataUser } from "../../../utils/helperFunction";
import { TableSkeleton } from "../../TableSkeleton";
import { CTable } from "../CTable";

interface Props extends TableProps {
  filterSearch: string;
}

export const TableCategory = ({ filterSearch, ...rest }: Props) => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();

  useEffect(() => {
    const ownerId = getDataUser()._id;
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/product/getAllCategory/${ownerId}`,
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
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item, i) => [
        {
          id: "categoryName",
          name: item.name,
          props: { display: "table-cell" },
        },
        {
          id: "dateCreated",
          name: item.createdAt,
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
