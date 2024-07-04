import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";
// import {server, socketConnection} from "./socket.js";

// const server = createServer(app);
const port =  443;

//uncaught exception handle
process.on("uncaughtException", (err) => {
  console.log("uncaught exception", err);
  process.exit(1);
});
//connected socket
// socketConnection();
//database connection
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
  //unhandled rejection handle
//   process.on("unhandledRejection", (error) => {
//     if (server) {
//       server.close(() => {
//         console.log("unhandled rejection", error);
//         process.exit(1);
//       });
//     } else {
//       process.exit(1);
//     }
//   });
};

db();
