import { Schema, model } from "mongoose";

const SkillSchema = new Schema({
user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  skillArray: [{ type: String }],
}
,
{
  timestamps: true,
}
);

export const Skill = model("Skill", SkillSchema);
