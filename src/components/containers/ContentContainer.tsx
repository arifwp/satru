import { Avatar, HStack, StackProps, VStack } from "@chakra-ui/react";
import { AdminContainer } from "./AdminContainer";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props extends StackProps {
  children?: any;
}

export const ContentContainer = ({ children }: Props) => {
  const sw = useScreenWidth();

  return (
    <AdminContainer>
      <VStack
        className="content-container"
        ml={"auto"}
        w={sw >= 640 ? "calc(100% - 72px)" : "100%"}
        h={sw >= 640 ? "100vh" : "calc(100vh - 72px)"}
        spacing={0}
        justify={"start"}
        flexGrow={1}
      >
        <HStack
          className="header"
          p={3}
          align={"center"}
          w={"100%"}
          h={"72px"}
          justify={"end"}
        >
          <ColorModeSwitcher fontSize={"24px"} />

          <Avatar size="sm" name="Arif Wahyu" src="" />
        </HStack>

        {children}
      </VStack>
    </AdminContainer>
  );
};
