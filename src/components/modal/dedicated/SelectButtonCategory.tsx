import { ButtonProps } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerButton } from "../PickerButton";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const SelectButtonCategory = ({
  name,
  withSearch,
  icon,
  onConfirm,
  ...rest
}: Props) => {
  const category = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Komputer" },
    { id: 3, name: "Smartphone" },
    { id: 4, name: "Laptop" },
    { id: 5, name: "Tablet" },
  ];

  return (
    <PickerButton
      name={name}
      options={category}
      icon={icon}
      placeholder={"Kategori"}
      withSearch={withSearch}
      withSkeleton={true}
      onConfirm={onConfirm}
      {...rest}
    />
  );
};
