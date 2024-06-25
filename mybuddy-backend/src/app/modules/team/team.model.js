import {Schema, model} from "mongoose";

const TeamSchema = new Schema(
  {
   
    
    title: {
      type: String,
     required: true,
    },
    description: {
      type: String,
       required: true,
    }
  },
  {
    timestamps: true,
  }
);



//create Team model
export const Team = model("Team", TeamSchema);
