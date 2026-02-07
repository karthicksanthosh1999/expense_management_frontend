"use client";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IUser } from "../types/userTypes";
import { userSchema } from "./schema/userSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FieldDescription } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { useUserCreateHook } from "./_hooks/userHooks";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const page = () => {
  const navigate = useRouter();

  const form = useForm({
    resolver: zodResolver(userSchema),
  });

  const { mutate } = useUserCreateHook();

  const handleUserSubmit = (data: IUser) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <Card>
        <CardContent className="sm:w-lg w-full">
          <CardHeader>
            <CardTitle>Signup Form</CardTitle>
            <CardDescription>Enter your details</CardDescription>
          </CardHeader>
          <Separator className="my-2" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUserSubmit)}
              className="space-y-5">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Enter full name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Enter password"
                      {...field}
                      type="password"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="mobile"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="Enter phone number"
                      {...field}
                      type="tel"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input placeholder="Enter email" {...field} type="email" />
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
            </form>
          </Form>
        </CardContent>
        <FieldDescription className="text-center">
          Back to{" "}
          <b onClick={() => navigate.push("/")} className="cursor-pointer">
            login
          </b>{" "}
          form
        </FieldDescription>
      </Card>
    </div>
  );
};

export default page;
