"use client";
import { ChartPieDonutText } from "./_components/category-chart";
import Link from "next/link";
import Footer from "@/components/footer";
import { ChevronLeft, CirclePlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentTransactions from "@/components/recent-transactions";
import { useGetAllCategories } from "./_hooks/categoryHooks";
import { useState } from "react";
import CategoryModel from "./_components/category-model";

const page = () => {
  const { data } = useGetAllCategories();

  const [modelOpen, setModelOpen] = useState(false);

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
      <section>{data && <ChartPieDonutText category={data} />}</section>

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

      {/* TRANSACTIONS */}
      <RecentTransactions limit={5} />

      <Footer title="Category" />

      <CategoryModel open={modelOpen} setOpen={setModelOpen} />
    </div>
  );
};

export default page;
