import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { category } from "../../../constant/Category";
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

export const SelectInputCategory = ({
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
        setData(category);
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
