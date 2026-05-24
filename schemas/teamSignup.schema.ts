import { z } from "zod";

export const teamSignupSchema = z
  .object({
    teamName: z.string().optional(),
    teamDiscriminator: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasTeamName = !!data.teamName?.trim();
      const hasDiscriminator = !!data.teamDiscriminator?.trim();

      // must pick ONLY one
      return (
        (hasTeamName && !hasDiscriminator) || (!hasTeamName && hasDiscriminator)
      );
    },
    {
      message:
        "Enter a Team Name OR a Team Discriminator (not both) (required)",
      path: ["teamName"],
    },
  );

export type TeamSignupForm = z.infer<typeof teamSignupSchema>;
