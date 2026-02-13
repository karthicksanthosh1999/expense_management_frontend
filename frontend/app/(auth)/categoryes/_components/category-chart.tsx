"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

type IProps = {
  categoryChartData: {
    date: string,
    title: string,
    fill: string,
    amount: number
  }[]
}

export function ChartPieDonutText({ categoryChartData }: IProps) {
  const totalVisitors = React.useMemo(() => {
    return categoryChartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <>
      <ChartContainer
        config={{}}
        className="mx-auto aspect-square max-h-62.5">

        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={categoryChartData}
            dataKey="amount"
            nameKey="title"
            innerRadius={60}
            strokeWidth={5}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle">
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        fill="#FFD700"
                        className="text-xl font-bold">
                        ₹{totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground">
                        This Week
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </>
  );
}
