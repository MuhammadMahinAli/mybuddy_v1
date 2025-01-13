import { Schema, model } from "mongoose";

const TutorialItemSchema = new Schema({
  displayText: { type: String, required: true },
  tutorialUrl: { type: String, required: true },
});

const TutorialsSchema = new Schema(
  {
    tools: [TutorialItemSchema],
    profile: [TutorialItemSchema],
    feeds: [TutorialItemSchema],
    researchers: [TutorialItemSchema],
    projects: [TutorialItemSchema],
    tasks: [TutorialItemSchema],
    funds: [TutorialItemSchema],
    meetings: [TutorialItemSchema],
    appearance: [TutorialItemSchema], // Corrected spelling
  },
  {
    timestamps: true,
  }
);

export const Tutorials = model("Tutorials", TutorialsSchema);


// import { Schema, model } from "mongoose";

// const TutorialsSchema = new Schema(
//   {
//     tools: [{ type: String }],
//     profile: [{ type: String }],
//     feeds: [{ type: String }],
//     researchers: [{ type: String }],
//     projects: [{ type: String }],
//     funds: [{ type: String }],
//     meetings: [{ type: String }],
//     appearcence: [{ type: String }],
//   },
//   {
//     timestamps: true,
//   }
// );

// //create Tutorials model
// export const Tutorials = model("Tutorials", TutorialsSchema);
