import { StackProps, VStack } from "@chakra-ui/react";
import { MenuHeader } from "../menu/MenuHeader";
import { AdminContainer } from "./AdminContainer";
import { MenuHeaderShrink } from "../menu/MenuHeaderShrink";
import useScreenWidth from "../../lib/useScreenWidth";
import { useBgBaseColor } from "../../constant/colors";

interface Props extends StackProps {
  children?: any;
  label: string;
  isSubPage: boolean;
  height?: string | undefined;
}

export const ContentContainer = ({
  children,
  label,
  isSubPage,
  height,
  ...rest
}: Props) => {
  const sw = useScreenWidth();
  const bg = useBgBaseColor();

  return (
    <AdminContainer {...rest}>
      <VStack
        className="content-container"
        bg={bg}
        ml={"auto"}
        w={"100%"}
        maxW={"calc(100% - 72px)"}
        h={height ? height : undefined}
        spacing={0}
        justify={"start"}
      >
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
