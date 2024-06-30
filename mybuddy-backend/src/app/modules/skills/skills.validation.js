import { z } from "zod";

export const createSkillZodSchema = z.object({
  body: z
    .object({
      user: z.string({
        required_error: "User is required",
      }),
      skillArray: z.array(z.string()).optional(),
    })
    .strict(),
});

export const updateSkillZodSchema = z.object({
  body: z
  .object({
    user: z.string({
      required_error: "User is required",
    }),
  skillArray: z.array(z.string()).optional(),
})
.strict(),
});
