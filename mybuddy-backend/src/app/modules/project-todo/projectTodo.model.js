import { Schema, model } from "mongoose";

const ProjectTodoSchema = new Schema(
  {
    projectName: {
      type: String,
    },

    listedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    projectStartDate: {
      type: Date,
    },
    projectEndDate: {
      type: Date,
    },

    todos: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        status: {
          type: String,
          enum: ["working"],
        },
        timer: {
          type: Number,
        },
      },
    ],

    checklist: [
      {
        id: { type: Number, required: true },
        text: { type: String, required: true },
        checked: { type: Boolean, required: true },
      },
    ],

    attachments: [
      {
        id: { type: Number, required: true },
        fileName: { type: String, required: true },
        uploadedAt: { type: String, required: true }, // Store as string if using `toLocaleString()`
        fileType: { type: String, required: true },
        fileUrl: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create ProjectTodo model
export const ProjectTodo = model("ProjectTodo", ProjectTodoSchema);
