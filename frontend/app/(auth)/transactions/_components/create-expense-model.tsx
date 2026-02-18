import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  transactionValidationSchema,
  TTransactionValidationSchemaType,
} from "../schema/transactionSchema";
import { useCreateTransactionHook } from "../_hooks/transactionHooks";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCategories } from "../../categoryes/_hooks/categoryHooks";
import { Card, CardContent } from "@/components/ui/card";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: "Income" | "Expense";
};

const TransactionModelForm = ({ open, setOpen, type }: TProps) => {
  const { user } = useAuth();
  const form = useForm({
    resolver: zodResolver(transactionValidationSchema),
    defaultValues: {
      expenseType: "",
      userId: "",
    },
  });

  useEffect(() => {
    form.reset({
      userId: user?.id,
      expenseType: type,
    });
  }, [user]);

  const { mutate } = useCreateTransactionHook();
  const { data: categoriesData } = useGetAllCategories();

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const handleExpenseSubmit = (data: TTransactionValidationSchemaType) => {
    mutate(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleExpenseSubmit)}>
              <FieldGroup>
                <div className="flex justify-between items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold text-white">{type}</h1>
                  <X className="text-white" onClick={handleClose} />
                </div>
                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Enter Amount"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="categoryId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categoriesData?.map((item) => (
                              <SelectItem key={item.id} value={item.id!}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Enter Description"
                        {...field}
                        type="text"
                        autoComplete="off"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer w-full bg-[#0066FF] hover:bg-blue-700"
                  variant={"default"}
                  type="submit">
                  Create
                </Button>
              </FieldGroup>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModelForm;
