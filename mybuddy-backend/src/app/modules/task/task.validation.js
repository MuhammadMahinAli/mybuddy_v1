const StatusEnum = z.enum(["pending", "completed"]);
const PriorityEnum = z.enum(["low", "medium", "high"]);

const SubTaskSchema = z.object({
  todo: z.string().optional(),
  status: StatusEnum,
});

export const TaskSchema = z.object({
    title: z.string().optional(),
    details: z.string().optional(),
    taskType: z.string().optional(),
    coin: z.string().optional(),
    priority: PriorityEnum,
    status: StatusEnum,
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    subTasks: z.array(SubTaskSchema).optional(),
  });