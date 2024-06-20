import { Box, HStack, VStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ ...rest }) => {
  const bgComponent = useColorModeValue("#F5F7F8", "#161618");

  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "# of Votes",
        data: [80, 20],
        backgroundColor: ["#38B2AC", "#4299E1"],
        borderWidth: 0,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <VStack
      className="doughnut-chart"
      w={"100%"}
      minH={"300px"}
      maxH={"320px"}
      h={"100%"}
      justify={"center"}
      bg={bgComponent}
      borderRadius={"lg"}
      p={8}
      {...rest}
    >
      <Doughnut data={data} options={options} />

      <HStack w={"100%"} justify={"space-evenly"}>
        <HStack>
          <Box borderRadius={"full"} w={"10px"} h={"10px"} bg={"teal.400"} />
          <Text fontSize={"xs"}>Data 1</Text>
        </HStack>
        <HStack>
          <Box borderRadius={"full"} w={"10px"} h={"10px"} bg={"blue.400"} />
          <Text fontSize={"xs"}>Data 1</Text>
        </HStack>
      </HStack>
    </VStack>
  );
};
