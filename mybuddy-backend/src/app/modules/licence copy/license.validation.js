import { z } from "zod";

export const createLicenseZodSchema = z.object({
  body: z
   .object({
      user: z.string({
        required_error: "User is required",
      }),
      title: z.string({
        required_error: "Title is required",
      }),
      organization: z.string({
        required_error: "Organization is required",
      }),
      issueDate: z.date({
        required_error: "Issue date is required",
      }),
      credentialLink: z.string({
        required_error: "Credential link is required",
      }),
    })
   .strict(),
});
export const updateLicenseZodSchema = z.object({
  body: z
   .object({
      user: z.string({
        required_error: "User is required",
      }),
      title: z.string({
        required_error: "Title is required",
      }),
      organization: z.string({
        required_error: "Organization is required",
      }),
      issueDate: z.date({
        required_error: "Issue date is required",
      }),
      credentialLink: z.string({
        required_error: "Credential link is required",
      }),
    })
   .strict(),
});

// Similar schema for updates