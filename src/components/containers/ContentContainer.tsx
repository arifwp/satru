import { StackProps, VStack } from "@chakra-ui/react";
import useScreenWidth from "../../lib/useScreenWidth";
import { MenuHeader } from "../menu/MenuHeader";
import { MenuHeaderShrink } from "../menu/MenuHeaderShrink";
import { AdminContainer } from "./AdminContainer";

interface Props extends StackProps {
  children?: any;
  label: string;
}

export const ContentContainer = ({ children, label }: Props) => {
  const sw = useScreenWidth();

  return (
    <AdminContainer>
      <VStack
        className="content-container"
        ml={"auto"}
        w={"100%"}
        maxW={"calc(100% - 72px)"}
        h={"100vh"}
        spacing={0}
        justify={"start"}
      >
        {sw >= 600 ? (
          <MenuHeader label={label} />
        ) : (
          <MenuHeaderShrink label={label} />
        )}

        {children}
      </VStack>
    </AdminContainer>
  );
};
