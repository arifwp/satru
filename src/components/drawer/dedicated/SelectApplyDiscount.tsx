import { ButtonProps, useDisclosure, useToast } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { SelectOption } from "../../../constant/SelectOption";
import { getUserOrAdminId } from "../../../utils/helperFunction";
import { DrawerList } from "../DrawerList";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
}

export const SelectApplyDiscount = ({
  name,
  withSearch,
  icon,
  onConfirm,
  placeholder,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<SelectOption[] | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [limitPagination, setLimitPagination] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const token = getCookie("token");
      const userId = getUserOrAdminId();

      const request = {
        ownerId: userId,
        page: currentPage,
        limit: limitPagination,
        search: search,
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
    }
  }, [isOpen, search, toast, currentPage, limitPagination]);

  return (
    <DrawerList
      name={name}
      options={data}
      icon={icon}
      placeholder={placeholder}
      withSearch={withSearch}
      onConfirm={onConfirm}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      loaded={loaded}
      filterSearch={(inputValue) => {
        setSearch(inputValue);
      }}
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
