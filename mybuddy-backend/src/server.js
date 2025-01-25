import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";
 const port =  process.env.PORT || 8000 ;


//uncaught exception handle
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  process.exit(1);
});

export const db = async () => {
  try {
    await mongoose.connect(config.database_url);

    console.log("🚀 Database connected successfully");
    app.listen(port, () => {
      console.log(` App listening on port ${port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

};

db();
