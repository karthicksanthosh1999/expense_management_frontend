"use client";

import { ColumnDef } from "@tanstack/react-table";
export type Payment = {
  id: string;
  amount: number;
  category: "pending" | "processing" | "success" | "failed";
  date: string;
  remarks: string;
  transactionType: "Income" | "Expense";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => {
      const { transactionType } = row.original;
      return (
        <h3
          className={`${transactionType === "Expense" ? "text-red-500" : "text-green-500"}`}>
          {transactionType}
        </h3>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];
