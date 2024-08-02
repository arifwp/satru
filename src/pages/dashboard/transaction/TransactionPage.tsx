import {
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { PageContainer } from "../../../components/containers/PageContainer";
import { pageNavsTransaction } from "../../../constant/pageNavs";

export const TransactionPage = () => {
  return (
    <PageContainer navs={pageNavsTransaction}>
      <VStack className="manual-container" w={"100%"} p={4}>
        <Heading>Manual transaction</Heading>
      </VStack>
    </PageContainer>
  );
};
