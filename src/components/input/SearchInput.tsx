import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { RiCloseCircleLine, RiSearch2Line } from "@remixicon/react";
import { useState } from "react";

interface Props extends InputProps {
  placeholder: string;
  onConfirm: (inputValue: string) => void;
}

export const SearchInput = ({ placeholder, onConfirm, ...rest }: Props) => {
  const [data, setData] = useState<string>("");

  const handleChange = (event: any) => {
    setData(event.target.value);
    onConfirm(data);
  };

  const reset = () => {
    setData("");
    onConfirm(data);
  };

  return (
    <InputGroup size={"sm"} borderRadius={"xs"} {...rest}>
      <InputLeftElement pointerEvents="none">
        <Icon as={RiSearch2Line} color={"teal.400"} />
      </InputLeftElement>
      <Input
        type="text"
        value={data}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {data && (
        <InputRightElement>
          <IconButton
            size="sm"
            variant="ghost"
            icon={<Icon as={RiCloseCircleLine} />}
            aria-label="Reset input"
            _hover={{ bg: "transparent" }}
            onClick={reset}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
