import { z } from "zod";

export const createSocialInfoZodSchema = z.object({
  body: z
    .object({
      user: z.string({
        required_error: "User is required",
      }),
      orcid : z.string().optional(),
      researchGate : z.string().optional(),
      googleScholar : z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedIn: z.string().optional(),
      instagram: z.string().optional(),
      personalWebsite: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
      pinterest: z.string().optional(),
      facebook: z.string().optional(),
    })
    .strict(),
});

// update

export const updateSocialInfoZodSchema = z.object({
  body: z
    .object({
      user: z.string({
        required_error: "User is required",
      }),
      orcid : z.string().optional(),
      researchGate : z.string().optional(),
      googleScholar : z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedIn: z.string().optional(),
      instagram: z.string().optional(),
      personalWebsite: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
      pinterest: z.string().optional(),
      facebook: z.string().optional(),
    })
    .strict(),
});
