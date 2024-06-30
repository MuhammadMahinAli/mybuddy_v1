import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
const router = express.Router();
import {createPostZodSchema} from "./post.validation.js";
import {createNewPost,getAllPost, getSingleMemberPostController} from "./post.controller.js";


router.post("/create-new", createNewPost);
router.get("/getAll", getAllPost);
router.get("/getUserPostById/:id", getSingleMemberPostController);


export const PostRoutes = router;
//, validateRequest(createPostZodSchema)