import { Schema, model } from "mongoose";

const PostReactSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reactions: {
      love: [{ reactBy: { type: Schema.Types.ObjectId, ref: "Member" } }],
      like: [{ reactBy: { type: Schema.Types.ObjectId, ref: "Member" } }],
      celebrate: [{ reactBy: { type: Schema.Types.ObjectId, ref: "Member" } }],
      support: [{ reactBy: { type: Schema.Types.ObjectId, ref: "Member" } }],
      insightful: [{ reactBy: { type: Schema.Types.ObjectId, ref: "Member" } }],
    },
    comments: [
      {
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "Member",
        },
        commentText: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        replies: [
          {
            replyBy: {
              type: Schema.Types.ObjectId,
              ref: "Member",
              required: true,
            },
            replyText: {
              type: String,
              required: true,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

//create PostReact model
export const PostReact = model("PostReact", PostReactSchema);
