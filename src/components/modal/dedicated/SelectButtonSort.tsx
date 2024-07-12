import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { useEffect, useState } from "react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerButtonList } from "../PickerButtonList";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
  options: SelectOption[];
}

// const sort = [
//   { _id: "name", name: "Nama" },
//   { _id: "smallestStock", name: "Stok Terkecil" },
//   { _id: "biggestStock", name: "Stok Terbesar" },
//   { _id: "newest", name: "Terbaru" },
//   { _id: "oldest", name: "Terlama" },
// ];

export const SelectButtonSort = ({
  name,
  withSearch,
  icon,
  onConfirm,
  placeholder,
  options,
  ...rest
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<SelectOption[] | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setData(options);
    }
  }, [isOpen]);

  return (
    <PickerButtonList
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
