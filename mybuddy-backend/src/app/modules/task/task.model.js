import { Schema, model } from "mongoose";

const TaskSchema = new Schema(
  {
    projectOf: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: [{
      title: {
         type: String,
      },
      description: {
        type: String,
      },
  
     }],
  },
  {
    timestamps: true,
  }
);

//create task model
export const Task = model("Task", TaskSchema);
