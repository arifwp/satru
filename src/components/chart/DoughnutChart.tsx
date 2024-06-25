import {
  Box,
  ColorModeProviderProps,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props extends ColorModeProviderProps {
  bg: string;
}

export const DoughnutChart = ({ bg, ...rest }: Props) => {
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
      // h={"100%"}
      justify={"center"}
      bg={bg}
      borderRadius={"md"}
      p={8}
      {...rest}
    >
      <Doughnut
        data={data}
        options={options}
        style={{ minHeight: "300px", maxHeight: "320px" }}
      />

      <VStack w={"100%"} mt={4} justify={"space-arround"}>
        <HStack>
          <HStack>
            <Box borderRadius={"full"} w={"10px"} h={"10px"} bg={"teal.400"} />
            <Text fontSize={"xs"}>Data 1</Text>
          </HStack>
          <Text fontSize={"xs"}>400</Text>
        </HStack>

        <HStack>
          <HStack>
            <Box borderRadius={"full"} w={"10px"} h={"10px"} bg={"blue.400"} />
            <Text fontSize={"xs"}>Data 1</Text>
          </HStack>
          <Text fontSize={"xs"}>200</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
