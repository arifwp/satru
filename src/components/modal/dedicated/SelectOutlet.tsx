import { ButtonProps } from "@chakra-ui/react";
import { RemixiconComponentType } from "@remixicon/react";
import { PickerButton } from "../PickerButton";
import { SelectOption } from "../../../constant/SelectOption";

interface Props extends ButtonProps {
  name: string;
  withSearch: boolean;
  icon: RemixiconComponentType;
  onConfirm: (inputValue: SelectOption | undefined) => void;
}

export const SelectOutlet = ({
  name,
  withSearch,
  icon,
  onConfirm,
  ...rest
}: Props) => {
  const outlet = [
    { id: 1, name: "Semua Outlet" },
    { id: 2, name: "Pusat" },
    { id: 3, name: "Cabang Semarang" },
    { id: 4, name: "Cabang Yogyakarta" },
    { id: 5, name: "Cabang Depok" },
    { id: 6, name: "Cabang Boyolali" },
    { id: 7, name: "Semua outlet" },
  ];

  return (
    <PickerButton
      name={name}
      options={outlet}
      icon={icon}
      placeholder={"Semua"}
      withSearch={withSearch}
      withSkeleton={true}
      onConfirm={onConfirm}
      {...rest}
    />
  );
};
