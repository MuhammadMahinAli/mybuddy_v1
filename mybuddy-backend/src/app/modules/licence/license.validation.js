import { z } from "zod";

export const createLicenseZodSchema = z.object({
  body: z
   .object({
      user: z.string({
        required_error: "User is required",
      }),
      title: z.string().optional(),
      organization: z.string().optional(),
      issueDate: z.string().optional(),
      credentialLink: z.string().optional(),
    })
   .strict(),
});
export const updateLicenseZodSchema = z.object({
  body: z
   .object({
      // user: z.string({
      //   required_error: "User is required",
      // }),
      title: z.string().optional(),
      organization: z.string().optional(),
      issueDate:z.string().optional(),
      credentialLink: z.string().optional(),
    })
   .strict(),
});

// Similar schema for updates