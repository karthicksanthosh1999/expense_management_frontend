"use client";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddAmountHook } from "../_hooks/goalHooks";
import {
  goalAddValidationSchema,
  TGoalAddValidationSchemaType,
} from "../_schema/goalValidationSchema";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  goalId: string;
};

const AddAmountModel = ({ goalId, open, setOpen }: TProps) => {
  const { mutate } = useAddAmountHook();

  const form = useForm({
    resolver: zodResolver(goalAddValidationSchema),
    defaultValues: {
      goalId: "",
    },
  });

  useEffect(() => {
    if (goalId) {
      form.reset({
        goalId,
      });
    }
  }, [goalId, form]);

  const handelClose = () => {
    setOpen(false);
    form.reset();
  };

  const handelAddAmountSubmit = (amount: TGoalAddValidationSchemaType) => {
    mutate(amount);
    handelClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="border-[#0066FF]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-2xl">
            Add Amount
          </AlertDialogTitle>
          <AlertDialogDescription>
            Amount will be added your goal
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            className="p-2 md:p-4"
            onSubmit={form.handleSubmit(handelAddAmountSubmit)}>
            <FieldGroup className="space-y-1">
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <Label className="text-gray-400">Enter The Amount:</Label>
                    <Input
                      placeholder="Enter The Amount"
                      type="number"
                      inputMode="numeric"
                      className="p-2 w-full"
                      autoFocus
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FieldGroup>
            <div className="flex items-center justify-between mt-5">
              <Button
                type="submit"
                className="bg-[#0066FF] hover:bg-blue-900 cursor-pointer w-auto mt-2">
                Add Amount
              </Button>
              <Button
                type="button"
                onClick={handelClose}
                className="bg-red-500 hover:bg-red-900 cursor-pointer  mt-2">
                Close
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AddAmountModel;
