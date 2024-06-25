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
}

export const SearchInput = ({ placeholder, ...rest }: Props) => {
  const [data, setData] = useState<string>("");
  const handleChange = (event: any) => setData(event.target.value);
  const reset = () => setData("");

  return (
    <InputGroup size={"sm"} borderRadius={"xs"} {...rest}>
      <InputLeftElement pointerEvents="none">
        <Icon as={RiSearch2Line} />
      </InputLeftElement>
      <Input
        type="text"
        value={data}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <InputRightElement>
        <IconButton
          size="sm"
          variant="ghost"
          icon={<Icon as={RiCloseCircleLine} />}
          aria-label="Reset input"
          onClick={reset}
        />
      </InputRightElement>
    </InputGroup>
  );
};
