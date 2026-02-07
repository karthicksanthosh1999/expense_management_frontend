import { title } from "process";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MonthlyExpenseCard = () => {
  const dummyData = [
    {
      color: "#F97316",
      title: "Food",
      amount: "1200",
      percentage: "38%",
    },
    {
      color: "#F59E0B",
      title: " Transport",
      amount: "700",
      percentage: "22%",
    },
  ];

  return (
    <Card className="md:w-2xl w-full mx-5">
      <CardHeader>
        <CardTitle>Monthly Expenses Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex relative my-5 bg-white">
          <div className="absolute bottom-1 w-[100%] h-4 border-card border-2 rounded-lg"></div>
          <div className="absolute bottom-1 w-[60%] h-4 bg-green-400 rounded-lg"></div>
          <div className="absolute bottom-1 w-[50%] h-4 bg-orange-400 rounded-lg"></div>
        </div>
        {dummyData.map((item) => (
          <div className="flex justify-between items-center gap-2 ">
            <div className="flex items-center gap-2">
              <div
                className={`h-3.5 w-3.5 rounded-full`}
                style={{ color: "#fff" }}></div>
              <h5 className="text-sm font-medium text-gray-500">
                {item.title}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <h5 className="text-sm font-medium text-gray-500">
                ₹{item.amount}
              </h5>
              <h3 className="font-semibold text-lg">{item.percentage}</h3>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MonthlyExpenseCard;
