import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name is too long" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password is too long" }),
});

export type TSignupFormValues = z.infer<typeof signupFormSchema>;


