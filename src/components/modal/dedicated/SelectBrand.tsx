import { ButtonProps } from "@chakra-ui/react";
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

export const SelectBrand = ({
  name,
  placeholder,
  withSearch,
  isError,
  inputValue,
  onConfirm,
  ...rest
}: Props) => {
  const brand = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Asus" },
    { id: 3, name: "Toshiba" },
    { id: 4, name: "HP" },
    { id: 5, name: "MSI" },
    { id: 6, name: "Dell" },
  ];

  return (
    <PickerModal
      name={name}
      options={brand}
      placeholder={placeholder}
      withSearch={withSearch}
      isError={isError}
      inputValue={inputValue}
      onConfirm={onConfirm}
      {...rest}
    />
  );
};
