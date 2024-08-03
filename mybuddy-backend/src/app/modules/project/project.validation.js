
import { z } from "zod";

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
      required_error: "start Date is required",
    }),
    endDate: z.string({
      required_error: "end Date is required",
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
        priority: z.string(), 
        status: z.string(), 
        startDate: z.string(), 
        endDate: z.string(), 
        subTask: z.array(z.string())
      })
    ).optional(),
    documents: z.array(z.string()).optional(),
    pdfFiles: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
  }).strict(),
});

// import { z } from "zod";

// export const createProjectZodSchema = z.object({
//   body: z.object({
//     user: z.string({
//       required_error: "User ID is required",
//     }),
//     projectName: z.string({
//       required_error: "Project name is required",
//     }),
//     description: z.string({
//       required_error: "Project description is required",
//     }),
//     whatsApp: z.string({
//       required_error: "WhatsApp contact is required",
//     }),
//     discord: z.string({
//       required_error: "Discord contact is required",
//     }),
//     tasks: z.array(
//       z.object({
//         title: z.string({
//           required_error: "Task title is required",
//         }),
//         details: z.string({
//           required_error: "Task details are required",
//         }),
//         taskType: z.string({
//           required_error: "Task type is required",
//         }),
//         coin: z.string({
//           required_error: "Coin value is required",
//         }),
//         priority: z.string({
//           required_error: "Priority is required",
//         }),
//         duration: z.object({
//           startDate: z.string({
//             required_error: "Start date is required",
//           }),
//           endDate: z.string({
//             required_error: "End date is required",
//           }),
//         }),
//         subTask: z.array(z.string()).optional(),
//       })
//     ),
//     documents: z.array(z.string()).optional(),
//     pdfFiles: z.array(z.string()).optional(),
//     images: z.array(z.string()).optional(),
//     videoUrl: z.string().optional(),
//   }).strict(),
// });

// import { z } from "zod";

// export const createProjectZodSchema = z.object({
//   user: z.string({
//     required_error: "User ID is required",
//   }),
//   projectName: z.string({
//     required_error: "Project name is required",
//   }),
//   whatsApp: z.string({
//     required_error: "WhatsApp contact is required",
//   }),
//   discord: z.string({
//     required_error: "Discord contact is required",
//   }),
//   description: z.string({
//     required_error: "Project description is required",
//   }),
//   documents: z.array(z.string()).optional(),
//   pdfFiles: z.array(z.string()).optional(),
//   images: z.array(z.string()).optional(),
//   videoUrl: z.string().optional(),
//   tasks: z.array(
//     z.object({
//       title: z.string({
//         required_error: "Task title is required",
//       }),
//       details: z.string({
//         required_error: "Task details are required",
//       }),
//       taskType: z.string({
//         required_error: "Task type is required",
//       }),
//       coin: z.string({
//         required_error: "Coin is required",
//       }),
//       priority: z.string({
//         required_error: "Priority is required",
//       }),
//       duration: z.object({
//         startDate: z.string({
//           required_error: "Start date is required",
//         }),
//         endDate: z.string({
//           required_error: "End date is required",
//         }),
//       }),
//       subTask: z.array(z.string()).optional(),
//     })
//   ),
// });



