import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { SelectOption } from "../../../constant/SelectOption";
import { PickerButton } from "../PickerButton";
import { useEffect, useState } from "react";
import { category } from "../../../constant/Category";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
  placeholder: string;
}

export const SelectButtonCategory = ({
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

        // HIT API
        setData(category);
      }, 500);

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
