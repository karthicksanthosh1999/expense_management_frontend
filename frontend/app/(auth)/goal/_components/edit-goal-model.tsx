"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/app/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useCreateGoal } from "../_hooks/goalHooks";
import { useEffect } from "react";
import {
  goalValidationSchema,
  TGoalValidationSchemaType,
} from "../_schema/goalValidationSchema";

const EditGoalModel = () => {
  const { user } = useAuth();
  const { mutate } = useCreateGoal();
  const navigation = useRouter();

  const form = useForm({
    resolver: zodResolver(goalValidationSchema),
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

  const handelClose = () => {
    navigation.back();
    form.reset();
  };

  const handelCategorySubmit = (goal: TGoalValidationSchemaType) => {
    mutate(goal);
    handelClose();
  };
  return (
    <div>
      {/* GOAL HEADER SECTION */}
      <header className="bg-[#000000] px-2 mt-10 flex items-center justify-self-start gap-3">
        <Button
          onClick={() => navigation.back()}
          className="text-[#ffffff] cursor-pointer p-2 w-fit">
          <ChevronLeft size={40} />
        </Button>
        <h1 className="text-xl text-center font-normal tracking-wider text-white">
          Create a Goals Here
        </h1>
      </header>
      {/* GOAL FORM SECTION */}
      <Form {...form}>
        <form
          className="p-2 md:p-4"
          onSubmit={form.handleSubmit(handelCategorySubmit)}>
          <FieldGroup className="space-y-1">
            <FormField
              name="target"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label className="text-gray-400">Enter Goal Title:</Label>
                  <Input
                    placeholder="Enter Title"
                    type="text"
                    className="text-white border-b p-1 text-sm focus:outline-none"
                    autoFocus
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="goal"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label className="text-gray-400">Enter Total Amount:</Label>
                  <Input
                    placeholder="Enter Goal Amount"
                    type="number"
                    className="p-1 w-full"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <Label className="text-gray-400">Enter Initial Amount:</Label>
                  <Input
                    placeholder="Enter Initial Amount"
                    type="number"
                    className="p-1 w-full"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            className="bg-[#0066FF] hover:bg-blue-900 cursor-pointer w-full mt-2">
            Create Goal
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditGoalModel;
