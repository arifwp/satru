import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerButton } from "../PickerButton";
import { useEffect, useState } from "react";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
}

const sort = [
  { id: "name", name: "Nama" },
  { id: "smallestStock", name: "Stok Terkecil" },
  { id: "biggestStock", name: "Stok Terbesar" },
  { id: "newest", name: "Terbaru" },
  { id: "oldest", name: "Terlama" },
];

export const SelectButtonSort = ({
  name,
  withSearch,
  icon,
  onConfirm,
  placeholder,
  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<SelectOption[] | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setData(sort);
    }
  }, [isOpen]);

  return (
    <PickerButton
      name={name}
      options={data}
      icon={icon}
      placeholder={placeholder}
      withSearch={withSearch}
      withSkeleton={false}
      onConfirm={onConfirm}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      loaded={true}
      {...rest}
    />
  );
};
