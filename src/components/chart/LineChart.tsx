import { ColorModeProviderProps, VStack } from "@chakra-ui/react";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

interface Props extends ColorModeProviderProps {
  bg: string;
}

export const LineChart = ({ bg, ...rest }: Props) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Data Penjualan",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <VStack
      className="line-chart"
      w={"100%"}
      h={"100%"}
      bg={bg}
      borderRadius={"lg"}
      p={4}
      justify={"center"}
      {...rest}
    >
      <Line data={data} options={options} />
    </VStack>
  );
};
