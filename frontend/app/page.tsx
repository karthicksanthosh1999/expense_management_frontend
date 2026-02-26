"use client";

import Footer from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleDollarSign, Goal, HandCoins, Search } from "lucide-react";
import RecentTransactions from "@/components/recent-transactions";
import { ProfileDropdown } from "@/components/profile-dropdown";
import HomeCard from "@/components/cards/home-cart";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import TransactionModelForm from "./(auth)/transactions/_components/create-expense-model";
import Link from "next/link";
import { useGetCurrentAmountHook } from "./(auth)/transactions/_hooks/transactionHooks";
import { rupeesConverter } from "@/lib/rupeesConverter";

export default function Home() {
  const { user } = useAuth();

  const [transactionModelOpen, setTransactionModelOpen] = useState(false);
  const { data: currentAmountData } = useGetCurrentAmountHook()
  const [transactionType, setTransactionType] = useState<"Expense" | "Income">(
    "Expense",
  );

  const handleExpense = (type: "Expense" | "Income") => {
    setTransactionModelOpen(true);
    setTransactionType(type);
  };

  return (
    <>
      <div className="relative">
        {/* HEADER SECTION */}
        <header className="bg-[#000000] flex items-center justify-between px-5 mt-10">
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

          {/* AMOUNT SECTION */}
          <div className="bg-[#1E1E2D] text-[#ffffff] rounded-full w-fit">
            <ProfileDropdown />
          </div>
        </header>
        {/* CURRENT BALANCE SECTION */}
        <div className="my-5 space-y-3">
          <h1 className="text-center text-xl text-gray-500">Current Balance</h1>
          <h1 className="text-center text-3xl text-gray-300">{rupeesConverter(currentAmountData?.current_amount)}</h1>
        </div>

        <div className="my-5">
          <HomeCard />
        </div>
        <section className="flex items-center justify-around">
          <Link href="/transactions/type/expense"
            className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center justify-center cursor-pointer hover:">
              <HandCoins
                className="group-hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Expense
            </span>
          </Link>
          <Link href="/transactions/type/income"
            className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center justify-center cursor-pointer hover:">
              <CircleDollarSign
                className="hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Income
            </span>
          </Link>
          <div className="group flex items-center justify-center flex-col gap-2">
            <div className="bg-[#1E1E2D] hover:bg-gray-900 text-white font-semibold text-xl h-13 w-13 rounded-full flex items-center justify-center cursor-pointer hover:">
              <Goal
                className="group-hover:text-white  text-[#A2A2A7]"
                size={25}
              />
            </div>
            <span className="text-sm group-hover:text-white text-[#A2A2A7]">
              Goal
            </span>
          </div>
        </section>
        <TransactionModelForm
          type={transactionType}
          open={transactionModelOpen}
          setOpen={setTransactionModelOpen}
        />

        {/* TRANSACTIONS */}
        <RecentTransactions limit={4} />
        <Footer title="Home" />
      </div>
    </>
  );
}
