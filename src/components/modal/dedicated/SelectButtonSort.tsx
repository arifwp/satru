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

export const SelectButtonSort = ({
  name,
  withSearch,
  icon,
  onConfirm,
  ...rest
}: Props) => {
  const category = [
    { id: "name", name: "Nama" },
    { id: "smallestStock", name: "Stok Terkecil" },
    { id: "biggestStock", name: "Stok Terbesar" },
    { id: "newest", name: "Terbaru" },
    { id: "oldest", name: "Terlama" },
  ];

  return (
    <PickerButton
      name={name}
      options={category}
      icon={icon}
      placeholder={"Urutkan"}
      withSearch={withSearch}
      withSkeleton={true}
      onConfirm={onConfirm}
      {...rest}
    />
  );
};
