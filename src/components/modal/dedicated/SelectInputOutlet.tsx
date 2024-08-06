import { ButtonProps, useDisclosure, useToast } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { SelectOption } from "../../../constant/SelectOption";
import { getDataUser } from "../../../utils/helperFunction";
import { MultiPickerInput } from "../MultiPickerInput";

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
  const toast = useToast();

  useEffect(() => {
    const ownerId = getDataUser().ownerId
      ? getDataUser().ownerId
      : getDataUser()._id;
    const token = getCookie("token");

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/outlet/getAllOutlet/${ownerId}`,
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

  return (
    <MultiPickerInput
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
      {...rest}
    />
  );
};
