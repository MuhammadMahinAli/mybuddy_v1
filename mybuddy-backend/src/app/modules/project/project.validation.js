import { z } from "zod";
const StatusEnum = z.enum(["pending", "inprogress", "completed"]);
const PriorityEnum = z.enum(["low", "medium", "high"]);

const SubTaskSchema = z.object({
  todo: z.string().optional(),
  status: StatusEnum,
});

const CategoryEnum = z.enum(["technology", "tech"]);

export const createProjectZodSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: "User ID is required",
    }),
    projectName: z.string({
      required_error: "Project name is required",
    }),
    category: CategoryEnum,
    discord: z.string({
      required_error: "Discord is required",
    }),
    whatsApp: z.string({
      required_error: "WhatsApp is required",
    }),
    startDate: z.string({
      required_error: "Start Date is required",
    }),
    endDate: z.string({
      required_error: "End Date is required",
    }),
    description: z.string({
      required_error: "Project description is required",
    }),
    tasks: z.array(
      z.object({
        title: z.string(),
        details: z.string(),
        taskType: z.string(), 
        coin: z.string(), 
        priority: PriorityEnum, 
        status: StatusEnum, 
        startDate: z.string(), 
        endDate: z.string(), 
        subTask:z.array(SubTaskSchema).optional(),
      })
    ).optional(),
    documents: z.array(z.string()).optional(),
    pdfFiles: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
  }).strict(),
});


export const addNewTaskSchema = z.object({
  body:z.object({
    title:z.string().optional(),
    details:z.string().optional(),
    taskType:z.string().optional(),
    coin:z.string().optional(),
    status:z.string().optional(),
    startDate:z.string().optional()
  })
});