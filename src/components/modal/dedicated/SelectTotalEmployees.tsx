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

const totalEmployees = [
  { id: 1, name: "Kurang dari 10 karyawan" },
  { id: 2, name: "Lebih dari 10 kurang dari 25 karyawan" },
  { id: 3, name: "Lebih dari 25 kurang dari 50 karyawan" },
  { id: 4, name: "Lebih dari 50 karyawan" },
];

export const SelectTotalEmployees = ({
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
      setData(totalEmployees);
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
