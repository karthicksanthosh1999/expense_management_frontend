"use client";

import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, CircleDollarSign, Goal, HandCoins, Search } from "lucide-react";
import RecentTransactions from "@/components/recent-transactions";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";
import {
  useGetCurrentAmountHook,
  useGetCurrentWeekAmountHook,
} from "./(auth)/transactions/_hooks/transactionHooks";
import { rupeesConverter } from "@/lib/rupeesConverter";
import LineLoader from "@/components/line-loader";
import HomeCard from "@/components/cards/home-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { GoalHalfRadialChart } from "./(auth)/goal/_components/goal-half-radial-chart";

export default function Home() {
  const { user } = useAuth();
  const { data: currentAmountData, isLoading: currentAmountDataLoading } =
    useGetCurrentAmountHook();
  const {
    data: currentWeekAmountData,
    isLoading: currentWeekAmountDataLoading,
  } = useGetCurrentWeekAmountHook();
  return (
    <>
      <div className="relative">
        {/* HEADER SECTION */}
        <header className="bg-[#000000] flex items-center justify-between px-5 mt-10">
          {user ? (
            <div className="flex items-center gap-5">
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/maxleiter.png" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[#7E848D] text-xs">Welcome Back Chief</p>
                <h1 className="text-white text-lg font-semibold">
                  {user?.fullname ?? "N/A"}
                </h1>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          )}

          {/* AMOUNT SECTION */}
          <div className="bg-[#1E1E2D] text-[#ffffff] rounded-full w-fit">
            <ProfileDropdown />
          </div>
        </header>
        {/* CURRENT BALANCE SECTION */}
        <div className="my-5 space-y-3">
          <h1 className="text-center text-xl text-gray-500">Current Balance</h1>
          {currentAmountDataLoading ? (
            <LineLoader />
          ) : (
            <h1 className="text-center text-3xl text-gray-300">
              {rupeesConverter(currentAmountData?.current_amount)}
            </h1>
          )}
        </div>
        {/* CHART SECTION */}
        <div className="my-5">
          {currentWeekAmountDataLoading ? (
            <div className="flex items-end justify-around gap-4">
              {
                [1, 2, 3, 4, 5].map((item) => (

                  <Skeleton className="h-40 w-8" />
                ))
              }
            </div>
          ) : (
            <HomeCard chartData={currentWeekAmountData} />
          )}
        </div>
        {/* BUTTON SECTION */}
        <section className="flex items-center justify-around">
          {/* AI BUTTON */}
          <Link
            href="/ai"
            className="group flex items-center justify-center flex-col gap-2"
          >
            <div className="relative h-14 w-14 flex items-center justify-center">

              {/* Animated Border Ring */}
              <div className="absolute inset-0 rounded-full p-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
              </div>
              {/* Inner Button */}
              <div className="relative z-10 h-13 w-13 rounded-full bg-[#1E1E2D] flex items-center justify-center">
                <Bot
                  className="text-[#A2A2A7] group-hover:text-white transition-colors"
                  size={25}
                />
              </div>
            </div>
            <span className="text-sm font-semibold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-size-[200%_200%] bg-clip-text text-transparent animate-pulse"
            >
              AI
            </span>

          </Link>
          {/* EXPENSE BUTTON */}
          <Link
            href="/transactions/type/expense"
            className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center justify-center cursor-pointer">
              <HandCoins
                className="group-hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Expense
            </span>
          </Link>
          {/* INCOME BUTTON */}
          <Link
            href="/transactions/type/income"
            className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center justify-center cursor-pointer">
              <CircleDollarSign
                className="hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Income
            </span>
          </Link>
          {/* GOAL BUTTON */}
          <Link
            href={'/goal/add-goal'}
            title="Goal"
            className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center cursor-pointer justify-center">
              <Goal
                className="hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Goal
            </span>
          </Link>
        </section>
        {/* GOAL SECTION */}
        <section>
          <div className="mx-5 flex items-center justify-between m-5">
            <h4 className="text-lg font-normal tracking-wider text-white">Top Goal Status</h4>
            <Link href={'/goal'} className="text-sm font-semibold text-[#0066FF]">See All</Link>
          </div>
          {/* GOAL CHART */}
          <div className="h-36">
            <GoalHalfRadialChart />
          </div>
        </section>

        {/* TRANSACTIONS */}
        <RecentTransactions limit={4} />
        <Footer title="Home" />
      </div>
    </>
  );
}
