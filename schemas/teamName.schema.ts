import { z } from "zod";

export const teamNameSchema = z.object({
  teamName: z.string().min(2, "Team name is too short"),
});

export type TeamNameForm = z.infer<typeof teamNameSchema>;