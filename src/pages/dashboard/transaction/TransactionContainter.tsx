import { Stack } from "@chakra-ui/react";
import { ContentContainer } from "../../../components/containers/ContentContainer";
import useScreenWidth from "../../../lib/useScreenWidth";
import { CartPage } from "./CartPage";
import { TransactionPage } from "./TransactionPage";

export const TransactionContainer = () => {
  const sw = useScreenWidth();

  return (
    <Stack
      className="transaction-container"
      w={"100%"}
      overflowY={"auto"}
      align={"start"}
      spacing={0}
      direction={sw > 640 ? "row" : "column"}
    >
      <ContentContainer
        label="Tranksasi"
        isSubPage={false}
        w={sw > 640 ? "70%" : "100%"}
        h={"100vh"}
        overflowY={"auto"}
        // className="scrollY"
      >
        <TransactionPage />
      </ContentContainer>
      <CartPage
        ml={"auto"}
        w={sw > 640 ? "30%" : "100%"}
        maxW={sw > 640 ? undefined : "calc(100% - 72px)"}
        overflowY={"auto"}
      />
    </Stack>
  );
};
