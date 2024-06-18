import {
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  RiArchiveStackFill,
  RiExchangeDollarFill,
  RiFileChartFill,
  RiQuestionLine,
  RiShoppingBag2Fill,
} from "@remixicon/react";
import { CustomCard } from "../../components/CustomCard";
import { CustomTooltip } from "../../components/CustomToolTip";
import { LineChart } from "../../components/chart/LineChart";
import { DoughnutChart } from "../../components/chart/DoughnutChart";

export const HomePage = () => {
  const bgComponent = useColorModeValue("#F5F7F8", "#222831");

  return (
    <VStack className="home-container" w={"100%"} h={"100%"} p={4}>
      <SimpleGrid
        className="card-container"
        columns={[2, null, null, 4]}
        w={"100%"}
        spacing={4}
      >
        <CustomCard
          label="Total Penjualan"
          cardValue="Rp 1.820.000"
          bgIc="yellow.300"
          bgColor={"yellow.200"}
          asIc={RiShoppingBag2Fill}
        />
        <CustomCard
          label="Total Keuntungan"
          cardValue="Rp 1.820.000"
          bgIc="green.300"
          bgColor={"green.200"}
          asIc={RiExchangeDollarFill}
        />
        <CustomCard
          label="Total Tranksasi"
          cardValue="Rp 1.820.000"
          bgIc="blue.300"
          bgColor={"blue.200"}
          asIc={RiArchiveStackFill}
        />
        <CustomCard
          label="Produk Terjual"
          cardValue="13"
          bgIc="red.300"
          bgColor={"red.200"}
          asIc={RiFileChartFill}
        />
      </SimpleGrid>

      <Grid templateColumns={"repeat(12,1fr)"} gap={4} w={"100%"} mt={4}>
        <GridItem colSpan={[12, 12, 6, 6]}>
          <LineChart />
        </GridItem>
        <GridItem colSpan={[12, 12, 6, 6]}>
          <DoughnutChart />
        </GridItem>
      </Grid>

      {/* <Wrap className="chart-container" w={"100%"} mt={4}>
        <WrapItem>
          <LineChart />
        </WrapItem>

        <WrapItem>
          <DoughnutChart />
        </WrapItem>
      </Wrap> */}

      <HStack w={"100%"} flexWrap={"wrap"} spacing={4} mt={4} align={"start"}>
        <VStack
          p={4}
          borderRadius={"lg"}
          flex={1}
          align={"stretch"}
          bg={bgComponent}
        >
          <HStack>
            <Text as={"b"}>Detail Umum Penjualan</Text>
            <CustomTooltip label="Penjualan Kotor - (Diskon + Reedem Poin)">
              <Icon as={RiQuestionLine} fontSize={"18px"} />
            </CustomTooltip>
          </HStack>

          <HStack justify={"space-between"}>
            <Text>Penjualan Kotor</Text>
            <Text>Rp 18.200.000</Text>
          </HStack>

          <HStack justify={"space-between"}>
            <Text>Diskon</Text>
            <Text>-Rp 200.000</Text>
          </HStack>

          <HStack justify={"space-between"}>
            <Text>Redeem Poin Member</Text>
            <Text>Rp 10.000</Text>
          </HStack>

          <Divider />

          <HStack justify={"space-between"}>
            <Text as={"b"}>Total Penjualan</Text>
            <Text>Rp 18.200.000</Text>
          </HStack>
        </VStack>

        <VStack
          p={4}
          borderRadius={"lg"}
          flex={1}
          align={"stretch"}
          bg={bgComponent}
          fontSize={["sm", "md", "lg", "xl"]}
        >
          <HStack>
            <Text as={"b"}>Kasbon</Text>

            <CustomTooltip label="Rangkuman Kasbon">
              <Icon as={RiQuestionLine} fontSize={"18px"} />
            </CustomTooltip>
          </HStack>

          <HStack justify={"space-between"}>
            <Text>Total Kasbon</Text>
            <Text>Rp 1.000.000</Text>
          </HStack>

          <HStack justify={"space-between"}>
            <Text>Total Uang Muka & Cicilan</Text>
            <Text>Rp 500.000</Text>
          </HStack>

          <HStack justify={"space-between"}>
            <HStack>
              <Text>Total Member</Text>
              <CustomTooltip label="Total member yang melakukan tranksasi kasbon">
                <Icon as={RiQuestionLine} fontSize={"18px"} />
              </CustomTooltip>
            </HStack>

            <Text>3</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};
