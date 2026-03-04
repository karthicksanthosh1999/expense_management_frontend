import z from "zod";
export const goalValidationSchema = z.object({
  target: z.string({ message: "Title is required" }),
  goal: z.string({ message: "Goal is required" }),
  amount: z.string().optional(),
  userId: z.uuid({ message: "userId is required" }),
});

export type TGoalValidationSchemaType = z.infer<
  typeof goalValidationSchema
>;

export const goalAddValidationSchema = z.object({
  goalId: z.string({ message: "UserId is required" }),
  amount: z.string({ message: "Amount is required" }),
})

export type TGoalAddValidationSchemaType = z.infer<typeof goalAddValidationSchema>