import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { PickerButton } from "../PickerButton";
import { SelectOption } from "../../../constant/SelectOption";
import { useEffect, useState } from "react";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
}

const outlet = [
  { _id: 1, name: "Semua Outlet" },
  { _id: 2, name: "Pusat" },
  { _id: 3, name: "Cabang Semarang" },
  { _id: 4, name: "Cabang Yogyakarta" },
  { _id: 5, name: "Cabang Depok" },
  { _id: 6, name: "Cabang Boyolali" },
];

export const SelectOutlet = ({
  name,
  withSearch,
  icon,
  onConfirm,
  placeholder,
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
        setData(outlet);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  return (
    <PickerButton
      name={name}
      options={data}
      icon={icon}
      placeholder={placeholder}
      withSearch={withSearch}
      withSkeleton={true}
      onConfirm={onConfirm}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      loaded={loaded}
      {...rest}
    />
  );
};
