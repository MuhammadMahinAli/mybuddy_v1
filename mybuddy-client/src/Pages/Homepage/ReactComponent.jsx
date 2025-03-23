

// import React, { useEffect, useState } from "react";
// import PostLike from "../../icons/PostLike";
// import LoveIcon from "../../icons/LoveIcon";
// import PostSupportIcon from "../../icons/PostSupportIcon";
// import PostHandHeartIcon from "../../icons/PostHandHeartIcon";
// import PostIdeaIcon from "../../icons/PostIdeaIcon";
// import DefaultPostLike from "../../icons/DefaultPostLike";
// import PostComment from "../../icons/PostComment";
// import PostShare from "../../icons/PostShare";
// import { useDispatch } from "react-redux";

// const ReactComponent = ({
//   postId,
//   user,
//   theme,
// allPosts,
// setOpenComponent
// }) => {
//   const [reactionState, setReactionState] = useState({});
//   const [hoveredPostId, setHoveredPostId] = useState(null);
//   const [reactionsData, setReactionsData] = useState({});
//   const [userReaction, setUserReaction] = useState(null);
//   const [reactionCountText, setReactionCountText] = useState("");




//   useEffect(() => {
//     if (allPosts && allPosts?.data) {
//       const initialOpenComponent = {};
//       const initialReactionState =
//         JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
//       console.log(initialReactionState);
//       allPosts.data.posts.forEach((_, index, post) => {
//         initialOpenComponent[index] = "image";

//         if (!initialReactionState[post._id]) {
//           initialReactionState[post._id] = {
//             like: false,
//             love: false,
//             celebrate: false,
//             support: false,
//             insightful: false,
//           };
//         }
//       });

//       setOpenComponent(initialOpenComponent);
//       setReactionState(initialReactionState);
//     }
//   }, [allPosts]);

//   const handleReactionBoxToggle = (id) => {
//     setHoveredPostId(id);
//   };


//   const updateReaction = async (postId, reactedBy, reactionType) => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/v1/PostReact/update-reaction",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ postId, reactedBy, reactionType }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Reaction updated successfully:", data);
//       } else {
//         const errorData = await response.json();
//         console.error("Error updating reaction:", errorData.message);
//       }
//     } catch (error) {
//       console.error("Error updating reaction:", error.message);
//     }
//   };

//   const handleReactionToggle = async (postId, reactionType) => {
//     // Initialize the state for the post if it doesn't exist
//     const currentPostReactions = reactionState[postId] || {
//       like: false,
//       love: false,
//       celebrated: false,
//       supported: false,
//       insightfulled: false,
//     };

//     // Create a new updated state for the post based on the reaction type
//     const updatedReactions = {
//       ...reactionState,
//       [postId]: {
//         like: reactionType === "like" ? !currentPostReactions.like : false,
//         love: reactionType === "love" ? !currentPostReactions.love : false,
//         celebrate:
//           reactionType === "celebrate"
//             ? !currentPostReactions.celebrate
//             : false,
//         support:
//           reactionType === "support" ? !currentPostReactions.support : false,
//         insightful:
//           reactionType === "insightful"
//             ? !currentPostReactions.insightful
//             : false,
//       },
//     };

//     setReactionState(updatedReactions);
//     // storing redux
   

//     // Uncomment these lines once you have implemented the updateReaction function
//     const reactedBy = user?._id;
//     await updateReaction(postId, reactedBy, reactionType);
//   };

//   // console.log("oo", reactionsData, userReaction, reactionCountText);

//   useEffect(() => {
//     const fetchReactions = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/v1/PostReact/allReactions/${postId}`
//         );
//         const result = await response.json();
//         if (result.success) {
//           setReactionsData(result.data.reactions || {});
//         }
//       } catch (error) {
//         console.error("Error fetching reactions:", error);
//       }
//     };

//     fetchReactions();

//     // Get user reaction from local storage
//     const storedReactions =
//       JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
//     setUserReaction(storedReactions[postId]);
//   }, [postId, user?._id]);

//   useEffect(() => {
//     updateReactionCountText();
//   }, [reactionsData, userReaction]);

//   const updateReactionCountText = () => {
//     const reactionCounts = Object.values(reactionsData).flat();
//     const userId = user?._id;
//     if (!userId) {
//       setReactionCountText("");
//       return; // Exit if user is null or undefined
//     }

//     // Check if the user has reacted
//     const hasUserReacted = reactionCounts.some(
//       (reaction) => reaction.reactBy._id === userId
//     );
//     const otherReactionsCount =
//       reactionCounts.length - (hasUserReacted ? 1 : 0);

//     if (hasUserReacted && otherReactionsCount === 0) {
//       setReactionCountText("You reacted");
//     } else if (hasUserReacted && otherReactionsCount > 0) {
//       setReactionCountText(
//         `You and ${otherReactionsCount} more people reacted`
//       );
//     } else if (otherReactionsCount > 0) {
//       setReactionCountText(`${otherReactionsCount} people reacted`);
//     } else {
//       setReactionCountText("");
//     }
//   };

//   const renderReactions = () => {
//     const reactionIcons = [];
//     const userReactionIcons = {
//       like: <PostLike />,
//       love: <LoveIcon />,
//       celebrate: <PostSupportIcon />,
//       support: <PostHandHeartIcon />,
//       insightful: <PostIdeaIcon />,
//     };

//     // Add the user's reaction icon if it exists
//     if (userReaction) {
//       reactionIcons.push(userReactionIcons[userReaction]);
//     }

//     // Add other reaction icons excluding the user's reaction type
//     Object.keys(userReactionIcons).forEach((reactionType) => {
//       if (
//         reactionType !== userReaction &&
//         reactionsData[reactionType]?.length > 0
//       ) {
//         reactionIcons.push(userReactionIcons[reactionType]);
//       }
//     });

//     const { like, love, celebrate, support, insightful } =
//           reactionState[postId] || {};

//     return (
//       <div className="flex flex-col w-full">
//         <div className="flex items-center -space-x-3 w-full">
//           {reactionIcons}
//           <span
//             className={`${
//               theme === "light" ? "text-gray-600" : "text-white"
//             } text-sm lg:text-lg pl-4`}
//           >
//             {reactionCountText}
//           </span>
//         </div>
//         <div
//           onMouseLeave={() => setHoveredPostId(null)}
//           className="w-full flex space-x-4 border-t border-gray-300 pt-2 relative px-4"
//         >
//           <div
//             onMouseEnter={() => handleReactionBoxToggle(postId)}
//             className="py-2 flex space-x-4"
//           >
//             <button
//               onClick={() => handleReactionBoxToggle(postId)}
//               className="flex items-center space-x-1"
//             >
//               <span
//                 className={`${
//                   theme === "light" ? "text-gray-600" : "text-white"
//                 } text-xl`}
//               >
//                 {like ? (
//                   <PostLike />
//                 ) : love ? (
//                   <LoveIcon />
//                 ) : celebrate ? (
//                   <PostSupportIcon />
//                 ) : support ? (
//                   <PostHandHeartIcon />
//                 ) : insightful ? (
//                   <PostIdeaIcon />
//                 ) : (
//                   <DefaultPostLike />
//                 )}
//               </span>
//               <span
//                 className={`${
//                   like
//                     ? "text-blue-500"
//                     : love
//                     ? "text-red-500"
//                     : celebrate
//                     ? "text-yellow-500"
//                     : support
//                     ? "text-red-500"
//                     : insightful
//                     ? "text-yellow-500"
//                     : "text-gray-600"
//                 } ${
//                   theme === "light" ? "text-gray-600" : "text-white"
//                 } hidden ssm:block font-medium`}
//               >
//                 {like
//                   ? "Liked"
//                   : love
//                   ? "Loved"
//                   : celebrate
//                   ? "Celebrated"
//                   : support
//                   ? "Supported"
//                   : insightful
//                   ? "Insightfulled"
//                   : "Like"}
//               </span>
//             </button>
//             <button
//               className={`${
//                 theme === "light" ? "text-gray-600" : "text-white"
//               } flex items-center space-x-1  hover:text-blue-500 transition-colors duration-200`}
//             >
//               <span className="text-xl">
//                 <PostComment theme={theme} />
//               </span>
//               <span className="hidden ssm:block">Comment</span>
//             </button>
//             <button
//               className={`${
//                 theme === "light" ? "text-gray-600" : "text-white"
//               } flex items-center space-x-1  hover:text-blue-500 transition-colors duration-200`}
//             >
//               <span className="text-xl">
//                 <PostShare theme={theme} />
//               </span>
//               <span className="hidden ssm:block">Share</span>
//             </button>
//           </div>
//           {hoveredPostId === postId && (
//             <div className="flex items-center justify-between space-x-4 px-4 py-3 rounded-[50px] absolute -top-11 -left-3 bg-gray-50 shadow-gray-400 shadow-md border animate-fade-up">
//               <button
//                 title="Like"
//                 className="hover:scale-150 duration-100 hover:-mt-1"
//                 onClick={() => handleReactionToggle(postId, "like")}
//               >
//                 <PostLike liked={like} />
//               </button>
//               <button
//                 title="Love"
//                 className="hover:scale-150 duration-100"
//                 onClick={() => handleReactionToggle(postId, "love")}
//               >
//                 <LoveIcon loved={love} />
//               </button>
//               <button
//                 title="Celebrate"
//                 className="hover:scale-150 duration-100"
//                 onClick={() => handleReactionToggle(postId, "celebrate")}
//               >
//                 <PostSupportIcon celebrated={celebrate} />
//               </button>
//               <button
//                 title="Support"
//                 className="hover:scale-150 duration-100"
//                 onClick={() => handleReactionToggle(postId, "support")}
//               >
//                 <PostHandHeartIcon supported={support} />
//               </button>
//               <button
//                 title="Insightful"
//                 className="hover:scale-150 duration-100"
//                 onClick={() => handleReactionToggle(postId, "insightful")}
//               >
//                 <PostIdeaIcon insightfulled={insightful} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return <div>{renderReactions()}</div>;
// };

// export default ReactComponent;

import React, { useEffect, useState } from "react";
import PostLike from "../../icons/PostLike";
import LoveIcon from "../../icons/LoveIcon";
import PostSupportIcon from "../../icons/PostSupportIcon";
import PostHandHeartIcon from "../../icons/PostHandHeartIcon";
import PostIdeaIcon from "../../icons/PostIdeaIcon";

const ReactComponent = ({ postId, user, theme }) => {
  const [reactionsData, setReactionsData] = useState({});
  const [userReaction, setUserReaction] = useState(null);
  const [reactionCountText, setReactionCountText] = useState("");

  // console.log("oo", reactionsData, userReaction, reactionCountText);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/PostReact/allReactions/${postId}`
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

    // Get user reaction from local storage
    const storedReactions =
      JSON.parse(localStorage.getItem(`postReact_${user?._id}`)) || {};
    setUserReaction(storedReactions[postId]);
  }, [postId, user?._id]);

  useEffect(() => {
    updateReactionCountText();
  }, [reactionsData, userReaction]);

  const updateReactionCountText = () => {
    const reactionCounts = Object.values(reactionsData).flat();
    const userId = user?._id;
    if (!userId) {
      setReactionCountText("");
      return; // Exit if user is null or undefined
    }

    // Check if the user has reacted
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
      if (
        reactionType !== userReaction &&
        reactionsData[reactionType]?.length > 0
      ) {
        reactionIcons.push(userReactionIcons[reactionType]);
      }
    });

    return (
      <>
      <div className="flex items-center -space-x-3">
        {reactionIcons}
        <span
          className={`${
            theme === "light" ? "text-gray-600" : "text-white"
          } text-sm lg:text-lg pl-4`}
        >
          {reactionCountText}
        </span>
      </div>
      </>
    );
  };

  return <div>{renderReactions()}</div>;
};

export default ReactComponent;
