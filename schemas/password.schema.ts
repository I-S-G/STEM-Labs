import { z } from "zod";

export const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type PasswordForm = z.infer<typeof passwordSchema>;