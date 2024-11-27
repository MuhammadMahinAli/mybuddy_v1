import express from "express";
import {validateRequest} from "../../middlewars/validateRequest.js";
const router = express.Router();
import {createPostZodSchema} from "./post.validation.js";
import {createNewPost,deletePostController,getAllPost, getSingleMemberPostController, updatePostController} from "./post.controller.js";


router.post("/create-new", createNewPost);
router.get("/getAll", getAllPost);
router.get("/getUserPostById/:id", getSingleMemberPostController);
router.put('/update-info/:id', updatePostController);
router.delete("/deletePost/:id", deletePostController);

export const PostRoutes = router;
//, validateRequest(createPostZodSchema)