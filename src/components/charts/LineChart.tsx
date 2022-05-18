import { Box, Heading, useToken } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { ReactNode } from "react";

const colors = [
  "primary.400",
  "orange.400",
  "green.400",
  "blue.400",
  "purple.400",
  "red.400",
  "yellow.400",
  "teal.400",
];

export type Series = {
  name: string;
  data:
    | number[]
    | {
        x: any;
        y: number;
      }[];
};

interface GridConfiguration {
  show?: boolean;
  borderColor?: string;
  strokeDashArray?: number;
  position?: "front" | "back";
  xaxis?: {
    lines: {
      show: boolean;
    };
  };
  yaxis?: {
    lines: {
      show: boolean;
    };
  };
  opacity?: number;
}

interface ChartConfiguration {
  background?: string;
  fontFamily?: string;

  grid?: GridConfiguration;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
}

interface LineChartConfiguration extends ChartConfiguration {
  offsetX?: number;
  offsetY?: number;
}

const type = "line";

type LineChartProps = {
  title?: string;
  emptyState: ReactNode;
  data: Series[];
  options: LineChartConfiguration;
};

export default function LineChart({
  title,
  emptyState,
  data,
  options,
}: LineChartProps) {
  const themeColors = useToken("colors", colors);

  if (data.filter((d) => d.data.length !== 0).length === 0) {
    return <Box>{emptyState}</Box>;
  }

  return (
    <Box p="4">
      <Heading textAlign={"center"}>{title}</Heading>
      <Chart
        type={type}
        options={{ ...options, colors: themeColors }}
        series={data}
      />
    </Box>
  );
}
