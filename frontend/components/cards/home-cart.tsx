"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const HomeCard = () => {
  const chartData = [
    { day: "Sunday", expense: 186, income: 303 },
    { day: "Monday", expense: 305, income: 200 },
    { day: "Thursday", expense: 237, income: 120 },
    { day: "Wednesday", expense: 73, income: 190 },
    { day: "Thursday", expense: 209, income: 130 },
    { day: "Friday", expense: 214, income: 140 },
    { day: "Saturday", expense: 214, income: 140 },
  ];
  const chartConfig = {
    expense: {
      label: "Expense",
      color: "#0066FF",
    },
    income: {
      label: "Income",
      color: "#27273A",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tick={{
            fill: "#6b7280",
            fontSize: 12,
            fontWeight: 500,
          }}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Bar
          dataKey="expense"
          stackId="a"
          fill="var(--color-expense)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="income"
          stackId="a"
          fill="var(--color-income)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default HomeCard;
