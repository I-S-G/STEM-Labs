import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required"),

    email: z
      .email("Enter a valid email")
      .min(1, "Email is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    retypePassword: z
      .string()
      .min(1, "Please retype your password"),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Passwords do not match",
    path: ["retypePassword"],
  });
  
export type SignupForm = z.infer<typeof signupSchema>;