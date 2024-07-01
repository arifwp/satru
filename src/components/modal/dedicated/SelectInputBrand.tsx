import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerModal } from "../PickerModal";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  required?: boolean;
  withSearch: boolean;
  isError?: boolean;
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

const brand = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Asus" },
  { id: 3, name: "Toshiba" },
  { id: 4, name: "HP" },
  { id: 5, name: "MSI" },
  { id: 6, name: "Dell" },
];

export const SelectInputBrand = ({
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
      const timer = setTimeout(() => {
        setLoaded(true);
        // hit api
        setData(brand);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <PickerModal
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
