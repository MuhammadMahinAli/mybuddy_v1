import {Schema, model} from "mongoose";

const CertificateSchema = new Schema(
  {
  
    user:{
      type: Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    
    orgonizationName: {
      type: String,
       required: true,
    },
    field: {
      type: String,
     required: true,
    },
    issueDate: {
      type: String,
       required: true,
    },
    credentials: {
      type: String,
       required: true,
    }
  },
  {
    timestamps: true,
  }
);



//create certificate model
export const Certificate = model("Certificate", CertificateSchema);
