import cors from "cors";
import express from "express";
import httpStatus from "http-status";
import router from "./app/routes/index.js";
import {globalErrorHandler} from "./app/middlewars/gloalErrorHandler.js";


const app = express();

const corsOptions = {
  origin: 'https://researchbdy.com/', // Update with your actual Netlify domain
  credentials:true
};

app.use(cors(corsOptions));
//
//app.use(cors());
const bodyParserLimit = '100mb';
//parser 
app.use(express.json({limit:bodyParserLimit}));
app.use(express.urlencoded({extended: true,limit:bodyParserLimit}));

//use route
app.use("/api/v1", router); 
//
app.get("/", (req, res) => {
  res.send("Server is Listening..");
});

//global error handle
app.use(globalErrorHandler);
//handle not found
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessgaes: [{path: req.originalUrl, message: "Api not found"}],
  });

});
export default app;

