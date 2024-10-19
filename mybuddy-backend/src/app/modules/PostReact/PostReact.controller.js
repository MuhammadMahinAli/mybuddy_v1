import { getAllReactionOfaPost, getReactionOfSpecificPostSpecificUser, updateReaction } from "./PostReact.service.js";


export const handleReactionUpdate = async (req, res) => {
  const { postId,  reactedBy , reactionType } = req.body;

  try {
    const updatedPostReact = await updateReaction(postId,  reactedBy , reactionType);
    res.status(200).json({ message: 'Reaction updated successfully', data: updatedPostReact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// postReactionController.js


export const fetchPostReaction = async (req, res) => {
  const { postId, reactorId } = req.params;

  try {
    const reactionData = await getReactionOfSpecificPostSpecificUser(postId, reactorId);
    res.status(200).json(reactionData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const fetchPostAllReaction = async (req, res) => {
  const { postId } = req.params;

  try {
    const reactionData = await getAllReactionOfaPost(postId);
    res.status(200).json(reactionData);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
