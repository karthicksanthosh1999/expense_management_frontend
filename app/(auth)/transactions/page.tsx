import { columns, Payment } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      category: "pending",
      date: "22-Dec-2026: 18:56",
      remarks: "Tomato, Potato",
      transactionType: "Expense",
    },
  ];
}

export default async function page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
