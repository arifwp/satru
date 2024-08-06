import { AspectRatio, Avatar, TableProps, useToast } from "@chakra-ui/react";
import { SelectOption } from "../../../constant/SelectOption";
import { CTable } from "../CTable";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { formatDateToId, getDataUser } from "../../../utils/helperFunction";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserInterface } from "../../../constant/User";
import { useTriggerRenderStore } from "../../../store/useTriggerRenderStore";
import { Confirmation } from "../../modal/Confirmation";
import { RiDeleteBin2Line } from "@remixicon/react";
import { TableSkeleton } from "../../TableSkeleton";
import { Empty } from "../../Empty";

interface Props extends TableProps {
  filterOutlet: SelectOption[] | undefined;
  filterSearch: string;
}

export const TableEmployee = ({
  filterOutlet,
  filterSearch,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<UserInterface[] | undefined>(undefined);
  const [value, setValue] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toast = useToast();
  const { statusData, setStatusData } = useTriggerRenderStore();

  useEffect(() => {
    const token = getCookie("token");
    const userId = getDataUser()._id;
    let url;
    if (filterOutlet && filterOutlet.length !== 0) {
      const otltIds = filterOutlet.map((item) => item._id);
      const outletIds = otltIds.join(",");

      url = `${process.env.REACT_APP_API_URL}/v1/user/getUserByOwner/${userId}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/v1/user/getUserByOwner/${userId}`;
    }

    url &&
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
            duration: 2000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoaded(true);
        });
  }, [filterOutlet, filterSearch, toast, statusData]);

  useEffect(() => {
    if (data) {
      const formattedData = data.map((item, i) => [
        {
          id: "index",
          name: i + 1,
          props: { textAlign: "center" },
        },
        {
          id: "avatar",
          name: (
            <Avatar
              size={"xs"}
              src={`http://localhost:3000/uploads/users/avatars/${item.avatar}`}
              name={item.name}
              objectFit={"cover"}
            />
          ),
          props: {},
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
          id: "phone",
          name: item.phone,
          props: {},
        },
        {
          id: "email",
          name: item.email,
          props: {},
        },
        {
          id: "bornDate",
          name: formatDateToId(item.bornDate as any),
          props: {},
        },
        {
          id: "actionDelete",
          name: (
            <Confirmation
              size={"xs"}
              method="delete"
              colorScheme="red"
              variant={"ghost"}
              message={`Apakah anda yakin ingin menghapus data karyawan ${item.name}?`}
              url={`/v1/product/deleteProduct/${item._id}`}
              btnText="Hapus"
              icon={RiDeleteBin2Line}
              onConfirm={(inputValue) => {
                setStatusData();
              }}
            />
          ),
          props: {},
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
    { id: "avatar", name: "Foto", sortable: false, onClick: undefined },
    {
      id: "name",
      name: "Nama",
      sortable: true,
      onClick: () => sortByColumn("name"),
    },
    {
      id: "phone",
      name: "Whatsapp",
      sortable: true,
      onClick: () => sortByColumn("phone"),
    },
    {
      id: "email",
      name: "Email",
      sortable: true,
      onClick: () => sortByColumn("email"),
    },
    {
      id: "bornDate",
      name: "Tanggal Lahir",
      sortable: true,
      onClick: () => sortByColumn("bornDate"),
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
    return <Empty title="Karyawan tidak ditemukan" mt={6} />;
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
