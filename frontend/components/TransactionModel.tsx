import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";


type TProps = {
    open: boolean,
    setOpen: (open: boolean) => void,
    expenseType: "Expense" | "Income"
}

export function TransactionModel({ open, setOpen, expenseType }: TProps) {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-3xl">₹1000</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p className={`${expenseType === "Income" ? "text-[#0066FF]" : "text-gray-300"}`}>Expense</p>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <p className="text-start">Description:</p>
                                <p className="text-start">Category:</p>
                            </div>
                            <div className="">
                                <p className="text-end">Food</p>
                                <p className="text-end">Apple</p>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button className="cursor-pointer bg-[#0066FF] hover:bg-blue-900" onClick={() => setOpen(false)} >Close</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
