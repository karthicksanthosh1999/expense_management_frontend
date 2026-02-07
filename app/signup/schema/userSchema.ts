import { z } from "zod";

export const userSchema = z.object({
  fullName: z
    .string({ message: "Name is required" })
    .min(1, "Name is required"),
  email: z.email({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  password: z.string({ message: "Password is required" }),
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const updateUserValidationSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string({ message: "Name is required" })
    .min(1, "Name is required"),
  email: z.email({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  password: z.string().optional(),
});

export type TUpdateUserValidationSchemaType = z.infer<
  typeof updateUserValidationSchema
>;
