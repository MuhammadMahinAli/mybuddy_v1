// import { Schema, model } from "mongoose";

// const ProjectSchema = new Schema(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: "Member",
//     },
//     projectName: {
//       type: String,
//       required: true,
//     },
//     whatsApp: {
//       type: String,
//       required: true,
//     },
//     discord: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     documents: [
//       {
//         type: String,
//       },
//     ],
//     pdfFiles: [
//       {
//         type: String,
//       },
//     ],
//     images: [
//       {
//         type: String,
//       },
//     ],
//     videoUrl: {
//       type: String,
//     },
//     tasks: [{
//       title: { type: String, required: true },
//       details: { type: String, required: true },
//       taskType: { type: String, required: true },
//       coin: { type: String, required: true },
//       priority: { type: String, required: true },
//       duration: { type: Object, required: true },
//       subTask: [{ type: String }]
//     }],
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Project = model("Project", ProjectSchema);

import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    projectName: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    discord: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    documents: [
      {
        type: String,
      },
    ],
    pdfFiles: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],

    videoUrl: {
      type: String,
    },

    tasks: [
      {
        title: {
          type: String,
        },
        details: {
          type: String,
        },
        taskType: {
          type: String,
        },
        coin: {
          type: String,
        },
        priority: {
          type: String,
        },
        status:{
type:String
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        subTask: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create project model
export const Project = model("Project", ProjectSchema);
