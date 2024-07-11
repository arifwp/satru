import { ButtonProps } from "@chakra-ui/react";
import { DateSingleModal } from "./DateSingleModal";
import { string } from "yup";

interface Props extends ButtonProps {
  initialDate?: Date | null;
  placeholder: string;
  onConfirm: (date: string | null) => void;
}
export const SelectDateSingle = ({
  initialDate,
  placeholder,
  onConfirm,
  ...rest
}: Props) => {
  return (
    <DateSingleModal
      initialDate={initialDate}
      placeholder={placeholder}
      onConfirm={onConfirm}
      {...rest}
    />
  );
};
