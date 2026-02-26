"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  TUserValidationSchemaType,
  userValidationSchema,
} from "@/app/login/schema/loginValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useLoginHook } from "@/app/login/_hooks/loginHook";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(userValidationSchema),
  });

  const { mutate } = useLoginHook();

  const handelLogin = (data: TUserValidationSchemaType) => {
    mutate(data);
  };

  return (
    <div className={cn("w-full", className)} {...props}>

      <h1 className="text-white text-3xl font-normal">Sign In</h1>

      <Form {...form}>
        <form
          className="p-2"
          onSubmit={form.handleSubmit(handelLogin)}>

          <FieldGroup>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FieldLabel className="text-[#A2A2A7]">Email Address</FieldLabel>
                  <div className="flex gap-2">
                    <User className="text-[#A2A2A7]" size={25} />
                    <input
                      onChange={field.onChange}
                      type="email"
                      inputMode="email"
                      className="text-gray-300 border-b-2 border-b-gray-900 text-xl focus:outline-none border-0 placeholder:text-gray-500 p-1" placeholder="Enter Email Address"
                    />
                  </div>
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
            <Button
              className="cursor-pointer w-full"
              variant={"default"}
              type="submit">
              Create
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="/register">Sign up</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </Form>

    </div>
  );
}
