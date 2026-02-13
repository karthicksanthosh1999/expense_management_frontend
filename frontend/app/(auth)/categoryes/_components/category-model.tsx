import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { categoryValidationSchema } from "../_schema/categoryValidationSchema";
import { useCreateCategory } from "../_hooks/categoryHooks";
import { ICategoryTypes } from "@/app/(types)/categoryTypes";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CategoryModel = ({ open, setOpen }: TProps) => {

  const { user } = useAuth();
  const { mutate } = useCreateCategory();

  const form = useForm({
    resolver: zodResolver(categoryValidationSchema),
    defaultValues: {
      userId: "",
    },
  });

  useEffect(() => {
    if (user?.id) {
      form.reset({
        userId: user.id,
      });
    }
  }, [user?.id, form]);


  const handelCategorySubmit = (category: ICategoryTypes) => {
    mutate(category);
  };

  const handelClose = () => {
    setOpen(false);
    form.reset()
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="flex items-center justify-between">
            <AlertDialogTitle className="text-white text-xl text-left">
              Category
            </AlertDialogTitle>
            <Button type="reset" onClick={handelClose} className="cursor-pointer">
              <X />
            </Button>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              className="p-2 md:p-4"
              onSubmit={form.handleSubmit(handelCategorySubmit)}>
              <FieldGroup className="space-y-1">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-gray-400">Title:</Label>
                      <input placeholder="Enter Title" className="text-white border-b p-1 text-sm focus:outline-none" autoFocus {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="color"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex  items-center justify-between">
                      <Label className="text-gray-400">Select Color:</Label>
                      <Input
                        placeholder="Enter Color Code"
                        {...field}
                        type="color"
                        className="p-1 w-10"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
              <AlertDialogFooter className="mt-5">
                <Button
                  type="submit"
                  className="bg-[#0066FF] hover:bg-blue-900 cursor-pointer"
                  onClick={handelClose}>
                  Create
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CategoryModel;
