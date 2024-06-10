import { Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { ContentContainer } from "./ContentContainer";

export const HomePage = () => {
  return (
    <ContentContainer>
      <Heading>Ini adalah heading dari home</Heading>

      <ColorModeSwitcher
        position={"absolute"}
        bottom={0}
        right={0}
        fontSize={"36px"}
      />
    </ContentContainer>
  );
};
