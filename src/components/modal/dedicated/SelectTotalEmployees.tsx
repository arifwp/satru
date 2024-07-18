import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerInputList } from "../PickerInputList";

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
  { _id: 1, name: "Kurang dari 10 karyawan", value: 10 },
  { _id: 2, name: "Lebih dari 10 kurang dari 25 karyawan", value: 25 },
  { _id: 3, name: "Lebih dari 25 kurang dari 50 karyawan", value: 50 },
  { _id: 4, name: "Lebih dari 50 karyawan", value: 70 },
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
    <PickerInputList
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
