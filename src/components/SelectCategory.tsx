import { ButtonProps } from "@chakra-ui/react";
import { SelectOption } from "../constant/SelectOption";
import { PickerModal } from "./modal/PickerModal";
import { category } from "../data/category";

interface Props extends ButtonProps {
  name: string;
  placeholder: string;
  required?: boolean;
  withSearch: boolean;
  isError?: boolean;
  inputValue: SelectOption | undefined;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}
export const SelectCategory = ({
  name,
  placeholder,
  required,
  withSearch,
  isError,
  inputValue,
  onConfirm,
}: Props) => {
  const category = [
    { id: "1", name: "Buah" },
    { id: "2", name: "Sayuran" },
    { id: "3", name: "Smartphone" },
    { id: "4", name: "Laptop" },
    {
      id: "5",
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at lacus augue. Mauris scelerisque eros eu dapibus rutrum. Proin ut libero lobortis, hendrerit urna eget, mattis ante. Curabitur nec hendrerit velit, non viverra tellus. Nunc eget eros sed urna facilisis aliquam ac vitae dui. Mauris scelerisque massa sed venenatis ornare. Donec placerat diam eget condimentum egestas. Proin vitae lorem varius, maximus nunc ut, feugiat velit. Sed sit amet arcu quis erat luctus condimentum eget in lorem",
    },
    { id: "6", name: "Minuman" },
  ];

  return (
    <PickerModal
      name={name}
      options={category}
      placeholder={placeholder}
      required={required}
      withSearch={withSearch}
      isError={isError}
      inputValue={inputValue}
      onConfirm={onConfirm}
    />
  );
};
