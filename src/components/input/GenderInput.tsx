import {
  HStack,
  Radio,
  RadioGroup,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props extends StackProps {
  onConfirm: (inputValue: string) => void;
}

export const GenderInput = ({ onConfirm, ...rest }: Props) => {
  const [gender, setGender] = useState<string>("1");

  useEffect(() => {
    onConfirm(gender);
  }, [gender]);

  return (
    <VStack w={"100%"} align={"stretch"} {...rest}>
      <RadioGroup
        name="genderInput"
        defaultValue="1"
        colorScheme="teal"
        onChange={setGender}
      >
        <VStack align={"stretch"}>
          <Radio value="1">Laki-laki</Radio>
          <Radio value="2">Perempuan</Radio>
        </VStack>
      </RadioGroup>
    </VStack>
  );
};
