import { z } from "zod";

export const createPostZodSchema = z.object({
  body: z
    .object({
      postedBy: z.string({
        required_error: "User is required",
      }),
      description: z.string({
        required_error: "Description is required",
      }),
      technicalRecommendations: z.array(z.string()).optional(),
      teamMembers: z.array(z.string()).optional(),
      image:z.array(z.string()).optional(),
      comments: z.array(z.string()).optional(),
      comments: z.array(
        z.object({
          text: z.string({
            required_error: "Comment text is required",
          }),
          commentBy: z.string({
            required_error: "User is required for the comment",
          }),
        })
      ).optional(),  
      pdf:z.string().optional(),
    })
    .strict(),
});
