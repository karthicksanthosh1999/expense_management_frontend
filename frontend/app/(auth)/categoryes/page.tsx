"use client";

import { ChartPieDonutText } from "./_components/category-chart";
import Link from "next/link";
import Footer from "@/components/footer";
import { ChevronLeft, CirclePlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentTransactions from "@/components/recent-transactions";
import { useCategoryFilterHook, useGetAllCategories } from "./_hooks/categoryHooks";
import { useEffect, useState } from "react";
import CategoryModel from "./_components/category-model";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CategoryModelList from "./_components/category-list-model";
import { ISOToIndianDateFormate } from "@/lib/dateFormater";

const page = () => {
  const { data } = useGetAllCategories();

  const [modelOpen, setModelOpen] = useState(false);
  const [categoryModelOpen, setCategoryModelOpen] = useState(false);
  const [range, setRange] = useState("week");

  useEffect(() => {
    handleFilter("week");
  }, []);
  const { mutate, data: filteredCategoryData } = useCategoryFilterHook();


  const startOfDay = (d: Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const addDays = (d: Date, days: number) => {
    const date = new Date(d);
    date.setDate(date.getDate() + days);
    return date;
  };

  const handleFilter = (type: "week" | "month") => {
    const now = new Date();

    if (type === "week") {
      const today = startOfDay(now);
      const day = today.getDay();
      const diffToMonday = day === 0 ? -6 : 1 - day;

      const start = addDays(today, diffToMonday);
      const end = addDays(start, 7);

      mutate({ startDate: start, endDate: end });
    }

    if (type === "month") {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

      mutate({ startDate: start, endDate: end });
    }
  };


  const alertedChartData = filteredCategoryData?.map(c => ({
    date: ISOToIndianDateFormate(c?.createdat),
    title: c?.title,
    fill: c?.color,
    amount: c?.expenses.reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div>
      <header className="bg-[#000000] flex items-center justify-between px-5 mt-10">
        <Link
          href={"/"}
          className="bg-[#1E1E2D] text-[#ffffff] rounded-full p-2 w-fit">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-normal tracking-wider text-white">
          Categories List
        </h1>
        <Button
          onClick={() => setModelOpen(true)}
          size={"icon"}
          className="bg-[#1E1E2D] text-[#ffffff] rounded-full p-3 cursor-pointer ">
          <CirclePlus size={40} />
        </Button>
      </header>

      {/* CHART SECTION */}
      <section>{data && (
        <>
          {
            alertedChartData &&
            <ChartPieDonutText categoryChartData={alertedChartData} />
          }
        </>
      )}</section>

      <section className="flex items-center justify-between mx-3">
        <Select
          value={range}
          onValueChange={(val: "week" | "month") => {
            setRange(val);
            handleFilter(val);
          }}
        >
          <SelectTrigger className="w-full max-w-20 border-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
          </SelectContent>
        </Select>

        <Button type="button" onClick={() => setCategoryModelOpen(true)} variant={'link'} className="text-sm font-normal text-[#0066FF] cursor-pointer">See All</Button>
      </section>

      {/* CATEGORY LABELS */}
      <div className="grid grid-cols-3 gap-5 mx-5">
        {data &&
          data.map((item, idx) => (
            <div className="flex items-center gap-2" key={idx}>
              <div
                className={`h-3 w-3 rounded-xs`}
                style={{ backgroundColor: item.color }}></div>
              <h1 className="text-sm font-normal tracking-wider text-white truncate">
                {item.title}
              </h1>
            </div>
          ))}
      </div>


      {/* CATEGORIES LIST */}
      {
        data &&
        <CategoryModelList open={categoryModelOpen} setOpen={setCategoryModelOpen} categoryData={data} />
      }

      {/* TRANSACTIONS */}
      <RecentTransactions limit={5} />
      <Footer title="Category" />
      <CategoryModel open={modelOpen} setOpen={setModelOpen} />
    </div>
  );
};

export default page;
