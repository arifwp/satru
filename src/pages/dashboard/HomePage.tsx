import {
  Divider,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  RiArchiveStackFill,
  RiBox3Line,
  RiExchangeDollarFill,
  RiFileChartFill,
  RiQuestionLine,
  RiShoppingBag2Fill,
} from "@remixicon/react";
import { CustomCard } from "../../components/CustomCard";
import { CustomTooltip } from "../../components/CustomToolTip";
import { DoughnutChart } from "../../components/chart/DoughnutChart";
import { LineChart } from "../../components/chart/LineChart";
import { SelectDateRange } from "../../components/modal/dedicated/SelectDateRange";
import { SelectOutlet } from "../../components/modal/dedicated/SelectOutlet";
import { useBgBaseColor, useBgComponentBaseColor } from "../../constant/colors";

export const HomePage = () => {
  const bgComponent = useBgComponentBaseColor();

  const now = new Date();
  const initialStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const initialEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const bgBase = useBgBaseColor();

  return (
    <VStack className="home-container" w={"100%"} p={4} bg={bgBase}>
      <Stack
        w={"100%"}
        direction={["column", "row"]}
        alignSelf={{ sm: "stretch", md: "start" }}
      >
        <SelectDateRange
          initialStartDate={initialStartDate}
          initialEndDate={initialEndDate}
          onConfirmStart={(inputValue) => {
            // ADD TODO
            // console.log(inputValue);
          }}
          onConfirmEnd={(inputValue) => {
            // ADD TODO
            // console.log(inputValue);
          }}
        />
        <SelectOutlet
          name="outlet"
          placeholder="Filter Outlet"
          withSearch={true}
          icon={RiBox3Line}
          onConfirm={(inputValue) => {
            // ADD TODO
            // console.log(inputValue);
          }}
        />
      </Stack>

      <SimpleGrid
        className="card-container"
        columns={[2, null, null, 4]}
        w={"100%"}
        spacing={4}
        mt={4}
      >
        <CustomCard
          label="Total Penjualan"
          value="Rp 1.820.000"
          bgIc="yellow.300"
          bgColor={"yellow.200"}
          asIc={RiShoppingBag2Fill}
        />
        <CustomCard
          label="Total Keuntungan"
          value="Rp 1.820.000"
          bgIc="green.300"
          bgColor={"green.200"}
          asIc={RiExchangeDollarFill}
        />
        <CustomCard
          label="Total Tranksasi"
          value="Rp 1.820.000"
          bgIc="blue.300"
          bgColor={"blue.200"}
          asIc={RiArchiveStackFill}
        />
        <CustomCard
          label="Produk Terjual"
          value="13"
          bgIc="red.300"
          bgColor={"red.200"}
          asIc={RiFileChartFill}
        />
      </SimpleGrid>

      <SimpleGrid w={"100%"} columns={[1, 1, 1, 2, 2]} spacing={4} mt={2}>
        <LineChart bg={bgComponent} />
        <DoughnutChart bg={bgComponent} />
      </SimpleGrid>

      <SimpleGrid
        columns={[1, 1, 2, 2, 2]}
        w={"100%"}
        spacing={4}
        mt={2}
        fontSize={{
          base: "12px",
          sm: "14px",
          md: "14px",
          lg: "14px",
          xl: "16px",
        }}
      >
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
      </SimpleGrid>
    </VStack>
  );
};
