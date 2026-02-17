import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

  const handelLogin = (data: TTransactionValidationSchemaType) => {
    mutate(data);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{type}</DialogTitle>
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handelLogin)}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold text-white">{type}</h1>
                </div>
                <FormField
                  name="amount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Enter Amount"
                        {...field}
                        type="text"
                      />
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
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="cursor-pointer w-full"
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
