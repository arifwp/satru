import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { category } from "../../../constant/Category";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerInput } from "../PickerInput";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  required?: boolean;
  withSearch: boolean;
  isError?: boolean;
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const businessType = [
  { id: 1, name: "Makanan & Minuman" },
  { id: 2, name: "Kafe / Coffe Shop" },
  { id: 3, name: "Restoran" },
  { id: 4, name: "Roti, Kue & Camilan" },
  { id: 5, name: "Retail" },
  { id: 6, name: "Toko Kelontong & Retail" },
  { id: 7, name: "Minimarket" },
  { id: 8, name: "Vape Store" },
];

export const SelectBusinessType = ({
  name,
  placeholder,
  withSearch,
  isError,
  inputValue,
  onConfirm,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<SelectOption[] | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setLoaded(true);
      setData(businessType);
    }
  }, [isOpen]);

  return (
    <PickerInput
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
