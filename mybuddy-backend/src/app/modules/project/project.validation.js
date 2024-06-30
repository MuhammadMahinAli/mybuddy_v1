
import { z } from "zod";

export const createProjectZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: "User ID is required",
    }),
    projectName: z.string({
      required_error: "Project name is required",
    }),
    description: z.string({
      required_error: "Project description is required",
    }),
    tasks: z.array(
      z.object({
        title: z.string(),
        details: z.string(),
        budget: z.string(), 
      })
    ).optional(),
    documents: z.array(z.string()).optional(),
    pdfFiles: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
  }).strict(),
});
