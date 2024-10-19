import React, { useEffect, useState } from 'react';
import PostLike from '../../icons/PostLike';
import LoveIcon from '../../icons/LoveIcon';
import PostSupportIcon from '../../icons/PostSupportIcon';
import PostHandHeartIcon from '../../icons/PostHandHeartIcon';
import PostIdeaIcon from '../../icons/PostIdeaIcon';

const ReactComponent = ({ postId, user }) => {
  const [reactionsData, setReactionsData] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [reactionCountText, setReactionCountText] = useState('');

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/PostReact/allReactions/${postId}`);
        const result = await response.json();
        if (result.success) {
          setReactionsData(result.data.reactions || {});
        }
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchReactions();

    // Get user reaction from local storage
    const storedReactions = JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
    setUserReaction(storedReactions[postId]);
  }, [postId, user?._id]);

  useEffect(() => {
    updateReactionCountText();
  }, [reactionsData, userReaction]);

  const updateReactionCountText = () => {
    const reactionCounts = Object.values(reactionsData).flat();
    const userId = user?._id;

    // Check if the user has reacted
    const hasUserReacted = reactionCounts.some(reaction => reaction.reactBy._id === userId);
    const otherReactionsCount = reactionCounts.length - (hasUserReacted ? 1 : 0);

    if (hasUserReacted && otherReactionsCount === 0) {
      setReactionCountText('You react');
    } else if (hasUserReacted && otherReactionsCount > 0) {
      setReactionCountText(`You and ${otherReactionsCount} more people react`);
    } else if (otherReactionsCount > 0) {
      setReactionCountText(`${otherReactionsCount} people react`);
    } else {
      setReactionCountText('');
    }
  };

  const renderReactions = () => {
    const reactionIcons = [];
    const userReactionIcons = {
      like: <PostLike />,
      love: <LoveIcon />,
      celebrate: <PostSupportIcon />,
      support: <PostHandHeartIcon />,
      insightful: <PostIdeaIcon />,
    };

    // Add the user's reaction icon if it exists
    if (userReaction) {
      reactionIcons.push(userReactionIcons[userReaction]);
    }

    // Add other reaction icons excluding the user's reaction type
    Object.keys(userReactionIcons).forEach((reactionType) => {
      if (reactionType !== userReaction && reactionsData[reactionType]?.length > 0) {
        reactionIcons.push(userReactionIcons[reactionType]);
      }
    });

    return (
      <div className="flex items-center -space-x-3">
        {reactionIcons}
        <span className='pl-4'>{reactionCountText}</span>
      </div>
    );
  };

  return <div>{renderReactions()}</div>;
};

export default ReactComponent;
