import express from "express";
const router = express.Router();
import { fetchPostAllReaction, fetchPostReaction, handleReactionUpdate } from './PostReact.controller.js'



router.post('/update-reaction', handleReactionUpdate);
router.get("/reactions/:postId/:reactorId", fetchPostReaction);
router.get("/allReactions/:postId", fetchPostAllReaction);


export const PostReactRoutes = router;