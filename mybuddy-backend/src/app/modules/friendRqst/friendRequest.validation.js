// friendRequest.validation.js
import { z } from "zod";

export const createFriendRequestZodSchema = z.object({
 body: z.object({
    requestedBy: z.string({
      required_error: "User ID of the requester is required",
    }),
    requestedTo: z.string({
      required_error: "User ID of the recipient is required",
    }),
    status: z.enum(["Pending", "Accepted", "Rejected"], {
      required_error: "Status is required and must be one of 'Pending', 'Accepted', 'Rejected'",
    }),
 }).strict(),
});