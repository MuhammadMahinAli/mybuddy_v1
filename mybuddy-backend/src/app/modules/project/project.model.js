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

    uniqueId: {
      type: String,
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
    isMemberRequestAccept: {
      type: Boolean,
      default: true,
      required:true
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
        status: {
          type: String,
        },
        startDate: {
          type: String,
        },
        endDate: {
          type: String,
        },
        subTask: [
          {
            todo: { type: String },
            status: { type: String, default: "pending" },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create project model
export const Project = model("Project", ProjectSchema);
