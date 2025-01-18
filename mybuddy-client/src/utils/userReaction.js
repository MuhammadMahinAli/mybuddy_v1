import  { useEffect, useState } from "react";
import PostLike from "../icons/PostLike";
import LoveIcon from "../icons/LoveIcon";
import PostSupportIcon from "../icons/PostSupportIcon";
import PostHandHeartIcon from "../icons/PostHandHeartIcon";
import PostIdeaIcon from "../icons/PostIdeaIcon";

export const useReaction = (postId, user) => {
  const [reactionsData, setReactionsData] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [reactionCountText, setReactionCountText] = useState("");

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(
          `https://test-two-22w0.onrender.com/api/v1/PostReact/allReactions/${postId}`
        );
        const result = await response.json();
        if (result.success) {
          setReactionsData(result.data.reactions || {});
        }
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    fetchReactions();

    const storedReactions =
      JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
    setUserReaction(storedReactions[postId]);
  }, [postId, user?._id]);

  useEffect(() => {
    const reactionCounts = Object.values(reactionsData).flat();
    const userId = user?._id;
    if (!userId) {
      setReactionCountText("");
      return;
    }

    const hasUserReacted = reactionCounts.some(
      (reaction) => reaction.reactBy._id === userId
    );
    const otherReactionsCount =
      reactionCounts.length - (hasUserReacted ? 1 : 0);

    if (hasUserReacted && otherReactionsCount === 0) {
      setReactionCountText("You reacted");
    } else if (hasUserReacted && otherReactionsCount > 0) {
      setReactionCountText(
        `You and ${otherReactionsCount} more people reacted`
      );
    } else if (otherReactionsCount > 0) {
      setReactionCountText(`${otherReactionsCount} people reacted`);
    } else {
      setReactionCountText("");
    }
  }, [reactionsData, userReaction]);

  const reactionIcons = [];
  const userReactionIcons = {
    like: <PostLike />,
    love: <LoveIcon />,
    celebrate: <PostSupportIcon />,
    support: <PostHandHeartIcon />,
    insightful: <PostIdeaIcon />,
  };

  if (userReaction) {
    reactionIcons.push(userReactionIcons[userReaction]);
  }

  Object.keys(userReactionIcons).forEach((reactionType) => {
    if (
      reactionType !== userReaction &&
      reactionsData[reactionType]?.length > 0
    ) {
      reactionIcons.push(userReactionIcons[reactionType]);
    }
  });

  return { reactionIcons, reactionCountText };
};
