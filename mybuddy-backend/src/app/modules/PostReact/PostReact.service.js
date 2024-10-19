import { PostReact } from "./PostReact.model.js";

// add react
// export const updateReaction = async (postId, reactedBy, reactionType) => {
//   try {
//     // Find the reaction document for the specified postId
//     let postReact = await PostReact.findOne({ postId });

//     if (!postReact) {
//       // Create a new reaction entry if it doesn't exist for the post
//       const newPostReact = new PostReact({
//         postId,
//         reactions: {
//           [reactionType]: [{ reactBy: reactedBy }],
//         },
//       });
//       await newPostReact.save();
//       return newPostReact;
//     }

//     // Ensure that the reaction type exists in the object
//     if (!postReact.reactions[reactionType]) {
//       postReact.reactions[reactionType] = [];
//     }

//     // Check if the user has already reacted with the specified reaction type
//     const existingReactionIndex = postReact.reactions[reactionType].findIndex(
//       (reaction) => reaction.reactBy.toString() === reactedBy
//     );

//     if (existingReactionIndex > -1) {
//       // If the user has already reacted and unselects it, remove their reaction
//       postReact.reactions[reactionType].splice(existingReactionIndex, 1);
//     } else {
//       // If the user has not reacted yet, add their reaction
//       postReact.reactions[reactionType].push({ reactBy: reactedBy });
//     }

//     // Save the updated reactions to the database
//     await postReact.save();
//     return postReact;
//   } catch (error) {
//     console.error('Error updating reaction:', error.message);
//     throw new Error('Error updating reaction: ' + error.message);
//   }
// };

export const updateReaction = async (postId, reactedBy, newReactionType) => {
  try {
    // Find the reaction document for the specified postId
    let postReact = await PostReact.findOne({ postId });

    if (!postReact) {
      // Create a new reaction entry if it doesn't exist for the post
      const newPostReact = new PostReact({
        postId,
        reactions: {
          [newReactionType]: [{ reactBy: reactedBy }],
        },
      });
      await newPostReact.save();
      return newPostReact;
    }

    // Check if the user has already reacted with a different reaction type
    for (const [reactionType, reactionsArray] of Object.entries(postReact.reactions)) {
      const userIndex = reactionsArray.findIndex(
        (reaction) => reaction.reactBy.toString() === reactedBy
      );

      if (userIndex > -1 && reactionType !== newReactionType) {
        // Remove the user's ID from the previous reaction type
        postReact.reactions[reactionType].splice(userIndex, 1);
      }
    }

    // Ensure that the new reaction type array exists
    if (!postReact.reactions[newReactionType]) {
      postReact.reactions[newReactionType] = [];
    }

    // Add the user to the new reaction type if they haven't already reacted with it
    const alreadyReacted = postReact.reactions[newReactionType].some(
      (reaction) => reaction.reactBy.toString() === reactedBy
    );

    if (!alreadyReacted) {
      postReact.reactions[newReactionType].push({ reactBy: reactedBy });
    }

    // Save the updated reactions to the database
    await postReact.save();
    return postReact;
  } catch (error) {
    console.error('Error updating reaction:', error.message);
    throw new Error('Error updating reaction: ' + error.message);
  }
};


//-------  get react of specific post , specific reactBy

// postReactionService.js


export const getReactionOfSpecificPostSpecificUser = async (postId, reactorId) => {
  try {
    // Find the post by postId and populate postId and reactBy fields
    const post = await PostReact.findOne({ postId })
      .populate("postId") // Populating the post details
      .populate("reactions.love.reactBy") 
      .populate("reactions.like.reactBy")
      .populate("reactions.celebrate.reactBy")
      .populate("reactions.support.reactBy") 
      .populate("reactions.insightful.reactBy")
      .lean(); // Convert to a plain JS object

    if (post) {
      let reactionOfReactor = null;

      // Check each reaction type to see if the reactorId matches
      for (const [reactionType, reactors] of Object.entries(post.reactions)) {
        if (reactors.some((react) => react.reactBy._id.toString() === reactorId)) {
          reactionOfReactor = reactionType;
          break; 
        }
      }

      return {
        success: true,
        reaction: reactionOfReactor,
        postDetails: post.postId,
        userReactionDetails: post.reactions[reactionOfReactor],
      };
    } else {
      return {
        success: false,
        message: "Post not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving the reaction",
      error: error.message,
    };
  }
};


export const getAllReactionOfaPost = async (postId) => {
  try {
    const post = await PostReact.findOne({ postId })
      .populate("postId") 
      .populate("reactions.love.reactBy")
      .populate("reactions.like.reactBy")
      .populate("reactions.celebrate.reactBy")
      .populate("reactions.support.reactBy")
      .populate("reactions.insightful.reactBy")
      .lean()
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    if (post) {
      return {
        success: true,
        data: post,
      };
    } else {
      return {
        success: false,
        message: "Post not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while retrieving reactions",
      error: error.message,
    };
  }
};