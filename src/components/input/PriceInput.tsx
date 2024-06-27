import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { formatCurrency } from "../../utils/helperFunction";

interface Props {
  name: string;
  placeholder: string;
  isError?: boolean;
  inputValue: number | undefined;
  onChange: (inputValue: number | string | undefined) => void;
}

export const PriceInput = ({
  name,
  placeholder,
  isError,
  inputValue,
  onChange,
}: Props) => {
  const [price, setPrice] = useState<number | string | undefined>(undefined);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPrice(undefined);
      onChange(undefined);
    } else {
      const numericValue = parseFloat(value.replace(/[^\d]/g, ""));
      setPrice(formatCurrency(numericValue));
      onChange(numericValue);
    }
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" fontSize={"xs"}>
        Rp
      </InputLeftElement>
      <Input
        name={name}
        type="number"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        maxLength={20}
      />
    </InputGroup>
  );
};
