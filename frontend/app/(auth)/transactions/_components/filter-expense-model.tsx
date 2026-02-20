import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  transactionFilterValidationSchema,
  transactionValidationSchema,
  TTransactionFilterValidationSchemaType,
  TTransactionValidationSchemaType,
} from "../schema/transactionSchema";
import { useFilterTransactionHook } from "../_hooks/transactionHooks";
import { FieldGroup } from "@/components/ui/field";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: "Income" | "Expense";
};

const FilterTransactionsModel = ({ open, setOpen, type }: TProps) => {
  const form = useForm({
    resolver: zodResolver(transactionFilterValidationSchema),
  });

  const { mutate } = useFilterTransactionHook();

  const handleClose = () => {
    form.reset();
    setOpen(false);
  };

  const handleFilterExpenseSubmit = (
    data: TTransactionFilterValidationSchemaType,
  ) => {
    mutate(data);
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>Filter</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFilterExpenseSubmit)}>
            <FieldGroup>
              <div className="flex justify-between items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-white">{type}</h1>
                <X className="text-white" onClick={handleClose} />
              </div>

              <FormField
                name=""
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      type=""
                      placeholder="Enter Amount"
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="expenseType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Expense Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value={true}>True</SelectItem>
                          <SelectItem value={false}>False</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldGroup>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterTransactionsModel;
