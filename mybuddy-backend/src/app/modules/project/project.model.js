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
        budget:{
          type:String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create project model
export const Project = model("Project", ProjectSchema);
