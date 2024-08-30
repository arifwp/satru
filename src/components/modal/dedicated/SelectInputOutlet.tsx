import { ButtonProps, useDisclosure, useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { SelectOption } from "../../../constant/SelectOption";
import { getUserOrAdminId } from "../../../utils/helperFunction";
import { MultiPickerInputList } from "../MultiPickerInputList";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  required?: boolean;
  withSearch: boolean;
  isError?: boolean;
  inputValue: SelectOption[] | undefined;
  onConfirm: (inputValue: SelectOption[] | undefined) => void;
}

export const SelectInputOutlet = ({
  name,
  placeholder,
  required,
  withSearch,
  isError,
  inputValue,
  onConfirm,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<SelectOption[] | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined);
  const [limitPagination, setLimitPagination] = useState<number>(2);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const token = getCookie("token");

      const request = {
        ownerId: getUserOrAdminId(),
        page: currentPage,
        limit: limitPagination,
        search: search,
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
            isClosable: true,
          });
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  }, [isOpen, search, toast, currentPage, limitPagination]);

  return (
    <MultiPickerInputList
      name={name}
      options={data}
      placeholder={placeholder}
      withSearch={withSearch}
      isError={isError}
      inputValue={inputValue}
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
