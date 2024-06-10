import { Avatar, StackProps, VStack } from "@chakra-ui/react";
import { AdminContainer } from "./AdminContainer";

interface Props extends StackProps {
  children?: any;
}

export const ContentContainer = ({ children }: Props) => {
  return (
    <AdminContainer>
      <VStack w={"100%"} h={"100vh"} spacing={0}>
        <VStack
          className="header"
          bgColor={"#191919"}
          p={3}
          align={"end"}
          w={"100%"}
          h={"fit-content"}
          justify={"center"}
        >
          <Avatar
            size="sm"
            name="Arif Wahyu"
            src="https://bit.ly/broken-link"
          />
        </VStack>

        {children}
      </VStack>
    </AdminContainer>
  );
};
