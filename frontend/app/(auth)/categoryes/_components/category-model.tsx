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

type TProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CategoryModel = ({ open, setOpen }: TProps) => {
  const { user } = useAuth();

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

  console.log(form.formState.errors);
  const { mutate } = useCreateCategory();

  const handelCategorySubmit = (category: ICategoryTypes) => {
    mutate(category);
  };

  const handelClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-xl text-left">
              Category
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(handelCategorySubmit)}>
              <FieldGroup>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input placeholder="Enter Title" {...field} type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="color"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        placeholder="Enter Color Code"
                        {...field}
                        type="color"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FieldGroup>
              <AlertDialogFooter>
                <Button
                  type="submit"
                  className="bg-[#0066FF] hover:bg-blue-900"
                  onClick={handelClose}>
                  Create
                </Button>
                <Button
                  type="button"
                  className="bg-blue-900"
                  onClick={handelClose}>
                  Close
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
