import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password is too long" }),
});

export type TLoginFormValues = z.infer<typeof loginFormSchema>;
