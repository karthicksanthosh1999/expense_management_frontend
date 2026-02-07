import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "./data.json";
import { BalanceTrandsChart } from "@/components/charts/balance-trands-chart";
import MonthlyExpenseCard from "@/components/cards/monthly-expense-cart";
import TransactionHeader from "../settings/_components/transactionHeader";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="px-5">
          <TransactionHeader />
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="flex md:flex-row flex-col w-full gap-5 px-5">
            <BalanceTrandsChart />
            <MonthlyExpenseCard />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
