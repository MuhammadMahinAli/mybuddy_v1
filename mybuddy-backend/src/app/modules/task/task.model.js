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
  duration: {
    startDate: {
      type: String,

    },
    endDate: {
      type: String,
    
    },
  },
  subTask: [
    {
      type: String,
    },
  ],
});

//create task model
export const Task = model("Task", TaskSchema);
