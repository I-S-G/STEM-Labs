import { z } from "zod";

export const teamChangeSchema = z.object({
  teamDiscriminator: z
    .string()
    .min(6, "Invalid team discriminator"),
});

export type TeamChangeForm = z.infer<typeof teamChangeSchema>;