import { z } from "zod";

export const createExperienceZodSchema = z.object({
  body: z
    .object({
      user: z.string({
        required_error: "User is required",
      }),
      companyName: z.string().optional(),
      companyLocation: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      role: z.string().optional(),
      jobType: z.enum(["On-site", "Remote", "Hybride"]).optional(),
      employeeType: z
        .enum([
          "Internship",
          "Self-Employed",
          "Full-time Employee",
          "Part-time Employee",
          "Temporary Employee",
          "Seasonal",
          "Leased Employee",
          "At-will Employee",
        ])
        .optional(),
    })
    .strict(),
});

//------------- update experience

export const updateExperienceZodSchema = z.object({
  body: z
    .object({
      companyName: z.string().optional(),
      companyLocation: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      role: z.string().optional(),
      jobType: z.enum(["On-site", "Remote", "Hybride"]).optional(),
      employeeType: z
        .enum([
          "Internship",
          "Self-Employed",
          "Full-time Employee",
          "Part-time Employee",
          "Temporary Employee",
          "Seasonal",
          "Leased Employee",
          "At-will Employee",
        ])
        .optional(),
    })
    .strict(),
});
