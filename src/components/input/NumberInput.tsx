import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import formatNumber from "../../lib/formatNumber";

interface Props {
  name: string;
  placeholder: string;
  isCurrency: boolean;
  inputValue: number | string | undefined;
  onChange: (inputValue: number | string | undefined) => void;
}

export const NumberInput = ({
  name,
  placeholder,
  isCurrency,
  inputValue,
  onChange,
}: Props) => {
  const [price, setPrice] = useState<string | undefined>(
    formatNumber(inputValue ?? "")
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = formatNumber(value);
    setPrice(formattedValue);
    onChange(parseInt(value, 10) || undefined);
  };

  const formattedPrice = formatNumber(inputValue ?? "");

  if (isCurrency) {
    return (
      <InputGroup>
        <InputLeftElement pointerEvents="none" fontSize={"sm"}>
          Rp
        </InputLeftElement>
        <Input
          name={name}
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          value={formattedPrice}
          onChange={handleInput}
          maxLength={20}
        />
      </InputGroup>
    );
  }

  return (
    <Input
      name={name}
      type="text"
      placeholder={placeholder}
      value={formattedPrice}
      autoComplete="off"
      onChange={handleInput}
      maxLength={20}
    />
  );
};
