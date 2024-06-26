import { StackProps, VStack } from "@chakra-ui/react";
import { MenuHeader } from "../menu/MenuHeader";
import { AdminContainer } from "./AdminContainer";
import { MenuHeaderShrink } from "../menu/MenuHeaderShrink";
import useScreenWidth from "../../lib/useScreenWidth";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
}

export const ContentContainer = ({ children, label, isSubPage }: Props) => {
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
        {/* <MenuHeader label={label} /> */}
        {sw >= 600 ? (
          <MenuHeader label={label} isSubPage={isSubPage} />
        ) : (
          <MenuHeaderShrink label={label} isSubPage={isSubPage} />
        )}

        {children}
      </VStack>
    </AdminContainer>
  );
};
