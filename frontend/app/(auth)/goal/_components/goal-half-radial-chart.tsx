"use client";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { IGoalType } from "@/app/(types)/goalTypes";
import { useGetAllGoals } from "../_hooks/goalHooks";
import { useState } from "react";
import AppSkeleton from "@/components/AppSkliton";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  goal: {
    label: "Goal",
    color: "#1256bb",
  },
  amount: {
    label: "Amount",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface IProps {
  chartData?: IGoalType[];
}

export function GoalHalfRadialChart({ chartData }: IProps) {
  const { data: goalData, isLoading: goalDataLoading } = useGetAllGoals();
  const resolvedGoalData = chartData?.length
    ? chartData
    : goalData?.length
      ? [goalData[0]]
      : [];

  const totalVisitors = resolvedGoalData[0]?.amount ?? 0;
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-62.5 -z-10">
      {goalDataLoading ? (
        <Skeleton />
      ) : (
        <RadialBarChart
          data={resolvedGoalData}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      className="text-white">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-white text-2xl font-bold">
                        {totalVisitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground">
                        {resolvedGoalData[0].target}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="goal"
            stackId="a"
            cornerRadius={5}
            fill="var(--color-goal)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="amount"
            fill="var(--color-amount)"
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      )}
    </ChartContainer>
  );
}
