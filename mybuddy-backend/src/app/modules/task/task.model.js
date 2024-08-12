import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
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
      subTasks: [
        {
          todo: { type: String,},
          status: { type: String, default: "pending" },
        },
      ],

    
  
});

//create task model
export const Task = model("Task", TaskSchema);

      // subTask: [{ type: String }],