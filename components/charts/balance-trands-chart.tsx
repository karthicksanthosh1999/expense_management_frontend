"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A linear area chart";

const chartData = [
  { month: "January -1", desktop: 186 },
  { month: "February -2", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "march", desktop: 314 },
  { month: "Appral", desktop: 514 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BalanceTrandsChart() {
  return (
    <>
      <Card className="md:w-5xl w-full">
        <CardHeader>
          <div className="flex w-full items-center justify-between ">
            <div className="flex flex-col gap-2">
              <CardTitle>Balance Trends</CardTitle>
              <h1 className="md:text-3xl text-xl font-semibold">₹221478</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h4>Last Month</h4>
              <p className="flex flex-row items-center gap-1">
                <TrendingUp size={20} className="text-green-600" /> 12.25%
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-52 w-full" config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 6,
                right: 6,
              }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" hideLabel />}
              />
              <Area
                dataKey="desktop"
                type="linear"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
