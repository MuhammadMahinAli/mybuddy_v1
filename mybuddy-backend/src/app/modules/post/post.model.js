import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
  {
  postedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Member',
  },
  description: {
    type: String,
    required: true,
  },
  technicalRecommendations: [{ type: String }],

  teamMembers: [
    {
   member:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
   }
  }],
  image: {
    type: String,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      commentedBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Member',
      },
    },
  ],
  pdf: {
    type: String,
  },
}, {
  timestamps: true,
});

export const Post = model('Post', PostSchema);
