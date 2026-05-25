import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

export type ProfileForm = z.infer<typeof profileSchema>;