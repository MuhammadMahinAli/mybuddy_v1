import { Schema, model } from "mongoose";

const TodoSchema = new Schema(
  {
    title: {
      type: String,
    },

    startDate:{
      type: Date,
    },
    endDate:{
      type: Date,
    },


    listedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    status: {
      type: String,
      enum: ["working"],
    },
    timer: {
      type: Number,
    },
    description: {
      type: String,
    },

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

//create Todo model
export const Todo = model("Todo", TodoSchema);
