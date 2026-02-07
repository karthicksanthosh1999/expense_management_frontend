"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExpenseDialog } from "./tractionModel";
import { useState } from "react";

const TransactionHeader = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<"Expense" | "Income">("Income");
  const handleModelOpen = (title: "Expense" | "Income") => {
    setOpen(true);
    setTitle(title);
  };

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="md:text-2xl text-xl font-semibold">
            Welcome Mr, Joseph Karthick
          </h3>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <Button
            onClick={() => handleModelOpen("Income")}
            className="bg-green-400 hover:bg-green-500 cursor-pointer">
            Income
          </Button>
          <Button
            onClick={() => handleModelOpen("Expense")}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
            Expense
          </Button>
        </div>
      </CardContent>
      <ExpenseDialog open={open} setOpen={setOpen} title={title} />
    </Card>
  );
};

export default TransactionHeader;
